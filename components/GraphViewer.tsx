import { JSX, useEffect, useRef, useState } from "react"

import type { DataComponent } from "../../../wikisim-core/src/data/interface"
import { Graph } from "../../../wikisim-core/src/data/utils/graph"


// ─── Layout constants ──────────────────────────────────────────────────────────

const NODE_W = 160
const NODE_H = 64
const H_GAP = 24
// Vertical gap between bottom of a parent node and top of its children row.
// This space is used for the connector lines.
const V_GAP = 60
const SVG_PADDING = 24


// ─── Utility functions ─────────────────────────────────────────────────────────

/** Renders a DataComponent to a single-line display string. */
export function render_component(component: DataComponent): string
{
    return component.plain_title
}

/**
 * Returns the absolute and relative difference between the result_values of
 * two DataComponents.
 *   absolute_difference = component.result_value − alternative.result_value
 *   relative_difference = absolute_difference / |alternative.result_value|
 */
export function compute_differences(
    component: DataComponent,
    alternative: DataComponent,
): { absolute_difference: number; relative_difference: number }
{
    const val = numeric_result(component)
    const alt = numeric_result(alternative)
    const absolute_difference = val - alt
    const relative_difference = alt !== 0 ? absolute_difference / Math.abs(alt) : 0
    return { absolute_difference, relative_difference }
}

/**
 * Returns a CSS colour string for a given relative_difference value.
 *   • below minimum_relative_difference                → green
 *   • between minimum and maximum (exclusive)          → white → red (linear)
 *   • at or above maximum_relative_difference          → red
 */
export function get_color_for_relative_difference(
    relative_difference: number,
    minimum_relative_difference: number,
    maximum_relative_difference: number,
): string
{
    if (relative_difference < minimum_relative_difference) return "#4caf50"
    if (relative_difference >= maximum_relative_difference) return "#f44336"
    const t =
        (relative_difference - minimum_relative_difference) /
        (maximum_relative_difference - minimum_relative_difference)
    const gb = Math.round(255 * (1 - t))
    return `rgb(255,${gb},${gb})`
}


// ─── Private helpers ───────────────────────────────────────────────────────────

function numeric_result(component: DataComponent): number
{
    const raw = component.result_value
    return typeof raw === "number" ? raw : Number(raw ?? 0)
}

function truncate(s: string, max_chars: number): string
{
    return s.length > max_chars ? s.slice(0, max_chars - 1) + "…" : s
}

function format_diff_text(absolute: number, relative: number): string
{
    const sign = absolute >= 0 ? "+" : ""
    return `${sign}${absolute.toFixed(2)} (${sign}${(relative * 100).toFixed(1)}%)`
}


// ─── Internal tree types ───────────────────────────────────────────────────────

interface VisibleNode
{
    graph: Graph
    children: VisibleNode[]
    /** Number of graph children not shown due to display_width limit. */
    overflow_count: number
}

interface PlacedNode
{
    /** null when this is an overflow placeholder ("show N more"). */
    graph: Graph | null
    overflow_count: number
    /** Centre-x in SVG coordinate space. */
    cx: number
    /** Top-y in SVG coordinate space. */
    y: number
    parent_cx: number | null
    parent_bottom: number | null
}


// ─── Graph traversal ───────────────────────────────────────────────────────────

/**
 * Depth-first search for the first node whose component ID matches
 * `component_id` (compared as a string).  Returns null if not found.
 */
function find_graph_node(graph: Graph, component_id: number): Graph | null
{
    if (graph.component.id.to_str() === String(component_id)) return graph
    for (const child of graph.children)
    {
        const found = find_graph_node(child, component_id)
        if (found !== null) return found
    }
    return null
}

/**
 * Returns the first descendant reached by following the first child at each
 * level for `depth` levels, or the node itself when depth ≤ 0 or there are
 * no children.
 */
function first_descendant_at_depth(graph: Graph, depth: number): Graph
{
    if (depth <= 0 || graph.children.length === 0) return graph
    const first_child = graph.children[0]
    if (first_child === undefined) return graph
    return first_descendant_at_depth(first_child, depth - 1)
}

function build_visible_tree(
    graph: Graph,
    remaining_depth: number,
    max_width: number,
): VisibleNode
{
    if (remaining_depth <= 0)
    {
        return { graph, children: [], overflow_count: 0 }
    }
    const shown = graph.children.slice(0, max_width)
    const overflow_count = Math.max(0, graph.children.length - max_width)
    return {
        graph,
        children: shown.map(c => build_visible_tree(c, remaining_depth - 1, max_width)),
        overflow_count,
    }
}


// ─── Layout computation ────────────────────────────────────────────────────────

interface ChildEntry
{
    node: VisibleNode
    width: number
}

function child_entries(node: VisibleNode): ChildEntry[]
{
    return node.children.map(child => ({ node: child, width: subtree_min_width(child) }))
}

function subtree_min_width(node: VisibleNode): number
{
    const entries = child_entries(node)
    const extra = node.overflow_count > 0 ? 1 : 0
    const n = entries.length + extra
    if (n === 0) return NODE_W
    const sum = entries.reduce((s, e) => s + e.width, 0) + extra * NODE_W
    const total = sum + (n - 1) * H_GAP
    return Math.max(NODE_W, total)
}

function place_nodes(
    node: VisibleNode,
    cx: number,
    y: number,
    parent_cx: number | null,
    parent_bottom: number | null,
    out: PlacedNode[],
): void
{
    out.push({ graph: node.graph, overflow_count: 0, cx, y, parent_cx, parent_bottom })

    const entries = child_entries(node)
    const extra = node.overflow_count > 0 ? 1 : 0
    const n = entries.length + extra
    if (n === 0) return

    const total_w =
        entries.reduce((s, e) => s + e.width, 0) +
        extra * NODE_W +
        (n - 1) * H_GAP

    let x = cx - total_w / 2
    const child_y = y + NODE_H + V_GAP
    const this_bottom = y + NODE_H

    for (const { node: child, width } of entries)
    {
        place_nodes(child, x + width / 2, child_y, cx, this_bottom, out)
        x += width + H_GAP
    }

    if (node.overflow_count > 0)
    {
        out.push({
            graph: null,
            overflow_count: node.overflow_count,
            cx: x + NODE_W / 2,
            y: child_y,
            parent_cx: cx,
            parent_bottom: this_bottom,
        })
    }
}


// ─── SVG sub-components ────────────────────────────────────────────────────────

const ARROW_SIZE = 6

function Connector(props: {
    parent_cx: number
    parent_bottom: number
    child_cx: number
    child_top: number
}): JSX.Element
{
    const { parent_cx, parent_bottom, child_cx, child_top } = props
    const mid_y = Math.round((parent_bottom + child_top) / 2)

    const d = [
        `M ${parent_cx} ${parent_bottom}`,
        `V ${mid_y}`,
        `H ${child_cx}`,
        `V ${child_top - ARROW_SIZE}`,
    ].join(" ")

    const arrow_points = [
        `${child_cx - ARROW_SIZE / 2},${child_top - ARROW_SIZE}`,
        `${child_cx + ARROW_SIZE / 2},${child_top - ARROW_SIZE}`,
        `${child_cx},${child_top}`,
    ].join(" ")

    return <>
        <path d={d} fill="none" stroke="#888" strokeWidth={1.5} />
        <polygon points={arrow_points} fill="#888" />
    </>
}

const MAX_TITLE_CHARS = 18
const MIN_REL_DIFF = 0.05
const MAX_REL_DIFF = 0.25

function GraphNode(props: { node: PlacedNode }): JSX.Element
{
    const { node } = props
    const x = node.cx - NODE_W / 2
    const y = node.y

    if (node.graph === null)
    {
        return <g>
            <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx={6}
                fill="#f5f5f5"
                stroke="#ccc"
                strokeWidth={1}
                strokeDasharray="4 3"
            />
            <text
                x={node.cx}
                y={y + NODE_H / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
                fill="#666"
            >
                {`show ${node.overflow_count} more`}
            </text>
        </g>
    }

    const { absolute_difference, relative_difference } = compute_differences(
        node.graph.component,
        node.graph.alternative,
    )
    const bg = get_color_for_relative_difference(relative_difference, MIN_REL_DIFF, MAX_REL_DIFF)
    const title = truncate(render_component(node.graph.component), MAX_TITLE_CHARS)
    const diff_text = format_diff_text(absolute_difference, relative_difference)

    return <g>
        <rect
            x={x}
            y={y}
            width={NODE_W}
            height={NODE_H}
            rx={6}
            fill={bg}
            stroke="#999"
            strokeWidth={1}
        />
        <text
            x={node.cx}
            y={y + 22}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={12}
            fontWeight="bold"
            fill="#222"
        >
            {title}
        </text>
        <text
            x={node.cx}
            y={y + 44}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fill="#444"
        >
            {diff_text}
        </text>
    </g>
}


// ─── Main component ────────────────────────────────────────────────────────────

export interface GraphViewerProps
{
    graph: Graph
    apex_component_id: number
    display_depth: number
    display_width: number
    start_depth?: number
}

export function GraphViewer(props: GraphViewerProps): JSX.Element
{
    const { graph, apex_component_id, display_depth, display_width, start_depth = 0 } = props

    const container_ref = useRef<HTMLDivElement>(null)
    const [container_w, set_container_w] = useState(800)

    useEffect(() =>
    {
        const el = container_ref.current
        if (!el) return

        const update_width = (w: number) =>
        {
            if (w > 0) set_container_w(w)
        }

        update_width(el.getBoundingClientRect().width)

        const observer = new ResizeObserver(entries =>
        {
            const w = entries[0]?.contentRect.width
            if (w !== undefined) update_width(w)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    // Locate the requested apex node inside the graph, falling back to root.
    const apex = find_graph_node(graph, apex_component_id) ?? graph

    // If start_depth > 0, descend into the graph before rendering.
    const display_root = first_descendant_at_depth(apex, start_depth)

    // Build the truncated visible tree and compute all node positions.
    const visible = build_visible_tree(display_root, display_depth, display_width)
    const tree_w = subtree_min_width(visible)

    // Centre the tree within whichever is wider: the tree itself or the container.
    const content_w = Math.max(tree_w, container_w - 2 * SVG_PADDING)
    const apex_cx = content_w / 2 + SVG_PADDING

    const placed: PlacedNode[] = []
    place_nodes(visible, apex_cx, SVG_PADDING, null, null, placed)

    const svg_w = content_w + 2 * SVG_PADDING
    const max_node_bottom = placed.reduce((m, n) => Math.max(m, n.y + NODE_H), NODE_H)
    const svg_h = max_node_bottom + SVG_PADDING

    return (
        <div ref={container_ref} style={{ width: "100%", overflowX: "auto" }}>
            <svg
                width={svg_w}
                height={svg_h}
                style={{ display: "block" }}
                xmlns="http://www.w3.org/2000/svg"
            >
                {placed.map((node, i) =>
                    node.parent_cx !== null && node.parent_bottom !== null
                        ? <Connector
                            key={`conn-${i}`}
                            parent_cx={node.parent_cx}
                            parent_bottom={node.parent_bottom}
                            child_cx={node.cx}
                            child_top={node.y}
                        />
                        : null
                )}
                {placed.map((node, i) =>
                    <GraphNode key={`node-${i}`} node={node} />
                )}
            </svg>
        </div>
    )
}
