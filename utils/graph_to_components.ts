import { DataComponent } from "../../../wikisim-core/src/data/interface"
import { Graph } from "./graph"


export function graph_to_components(graph: Graph): DataComponent[]
{
    const components: DataComponent[] = []

    function add_components(graph: Graph)
    {
        components.push(graph.component)
        graph.children.forEach(add_components)
    }

    add_components(graph)

    return components
}
