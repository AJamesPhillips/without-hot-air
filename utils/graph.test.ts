import { expect } from "chai"

import { data_components_json_to_map, DataComponentsMap } from "../../../utils/data_components_json_to_map"
import { flatten_data_component_to_json } from "../../../wikisim-core/src/data/convert_between_json"
import { IdAndVersion } from "../../../wikisim-core/src/data/id"
import { init_data_component } from "../../../wikisim-core/src/data/modify"
import { tiptap_mention_chip } from "../../../wikisim-core/src/rich_text/tiptap_mention_chip"
import { Graph, make_graph } from "./graph"


describe("graph", () =>
{

    const data = [
        init_data_component({ id: IdAndVersion.from_str("1v1"), title: "A value" }),
        init_data_component({ id: IdAndVersion.from_str("2v1"), title: "A top plan", input_value: `${tiptap_mention_chip("1v1")} + 2` }),
        init_data_component({ id: IdAndVersion.from_str("3v1"), title: "An author" }),
        init_data_component({ id: IdAndVersion.from_str("4v1"), title: "An alternative value", subject_id: 1, according_to_id: 3 }),
        init_data_component({ id: IdAndVersion.from_str("5v1"), title: "An alternative plan", input_value: `${tiptap_mention_chip("4v1")} + 3`, subject_id: 2, according_to_id: 3 }),
    ].map(flatten_data_component_to_json)
    const data_map: DataComponentsMap = data_components_json_to_map(data)

    it("makes a graph from a list of components and id_of_interest and ignores data from other graph", () =>
    {
        const graph = make_graph(data_map, { id_of_interest: 2 })
        const minimised = minimise_graph(graph)

        expect(minimised.map_concept_ids).deep.equals({
            1: 1,
            2: 2,
        })

        expect(minimised.nodes).deep.equals({
            "1": {
                title: "A value",
                children: [],
            },
            "1v1": {
                title: "A value",
                children: [],
            },
            "2": {
                title: "A top plan",
                children: ["1v1"],
            },
            "2v1": {
                title: "A top plan",
                children: ["1v1"],
            },
        })
    })


    it("makes a graph from a id_of_interest and includes its subject_ids referencing the id_of_concepts", () =>
    {
        const graph = make_graph(data_map, { id_of_interest: 5, id_of_concepts: 2 })

        const minimised = minimise_graph(graph)

        expect(minimised.map_concept_ids).deep.equals({
            1: 4,
            2: 5,
        })

        expect(minimised.nodes).deep.equals({
            "4": {
                title: "An alternative value",
                children: [],
            },
            "4v1": {
                title: "An alternative value",
                children: [],
            },
            "5": {
                title: "An alternative plan",
                children: ["4v1"],
            },
            "5v1": {
                title: "An alternative plan",
                children: ["4v1"],
            },
        })
    })


    it("makes a graph from a id_of_interest and includes its subject_ids referencing the id_of_concepts", () =>
    {
        const graph = make_graph(data_map, { id_of_interest: 2, id_of_comparison: 5 })

        const minimised = minimise_graph(graph)

        expect(minimised.map_concept_ids).deep.equals({
            1: 1,
            2: 2,
        })

        expect(minimised.nodes).deep.equals({
            "1": {
                title: "A value",
                children: [],
                alternatives: [4],
            },
            "1v1": {
                title: "A value",
                children: [],
                alternatives: [4],
            },
            "2": {
                title: "A top plan",
                children: ["1v1"],
                alternatives: [5],
            },
            "2v1": {
                title: "A top plan",
                children: ["1v1"],
                alternatives: [5],
            },

            // referenced alternatives
            "4": {
                title: "An alternative value",
                children: [],
            },
            "5": {
                title: "An alternative plan",
                children: ["4v1"],
            },
        })
    })
})


function minimise_graph(graph: Graph)
{
    const minimised: Record<string, { title: string, children: string[], alternatives?: number[] }> = {}
    for (const [id, node] of Object.entries(graph.nodes))
    {
        minimised[id] = {
            title: node.component.title,
            children: node.children.map(c => c.to_str()),
        }
        if (node.alternatives) minimised[id].alternatives = node.alternatives
    }

    return {
        map_concept_ids: graph.map_concept_id_to_id_of_interest,
        nodes: minimised,
    }
}
