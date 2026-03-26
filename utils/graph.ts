import { DataComponentsGetter } from "../../../utils/data_components_json_to_map"
import { IdOnly } from "../../../wikisim-core/src/data/id"
import { DataComponent } from "../../../wikisim-core/src/data/interface"
import { node_get_referenced_ids_from_tiptap } from "./node_get_referenced_ids_from_tiptap"


export interface Graph
{
    component: DataComponent
    children: Graph[]
    alternative?: DataComponent
}


export function make_graph(data_getter: DataComponentsGetter, top_level_id: number): Graph
{
    const top_level_component = data_getter(new IdOnly(top_level_id))
    if (!top_level_component) throw new Error(`Top level component with id ${top_level_id} not found`)

    function make_graph_recursive(component: DataComponent): Graph
    {
        const direct_dependency_ids = node_get_referenced_ids_from_tiptap(component.input_value || "")
        const children = direct_dependency_ids
            .map(data_getter)
            .filter((c): c is DataComponent => !!c)
            .map(make_graph_recursive)

        return {
            component,
            children,
            // alternative: component,
        }
    }

    return make_graph_recursive(top_level_component)
}
