import { useMemo, useState } from "react"

import { DataComponentsGetter } from "../../../utils/data_components_json_to_map"
import { DataComponent } from "../../../wikisim-core/src/data/interface"
import { make_graph } from "../utils/graph"
import { graph_to_components } from "../utils/graph_to_components"
import { factory_lookup_alternative } from "../utils/lookup_alternative"
import { EnergyBoxesHelper } from "./EnergyBoxesHelper"
import { perspective_general, PerspectiveType, SelectPerspective } from "./SelectPerspective"



export function NationalEnergy(props: { components: DataComponent[], components_getter: DataComponentsGetter })
{
    const { components_getter } = props
    const [perspective, set_perspective] = useState<PerspectiveType>(perspective_general)

    const graph = useMemo(() => make_graph(components_getter, parseInt(perspective)), [perspective])

    const lookup_alternative = useMemo(() => factory_lookup_alternative(graph_to_components(graph)), [graph])
    console.log("Graph for perspective: ", graph.component.id.id, " :", lookup_alternative(graph.component.id.id))

    return <>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1em" }}>
            <SelectPerspective
                perspective={perspective}
                on_change={set_perspective}
            />
        </div>

        <EnergyBoxesHelper
            render_up_to="Geothermal"
            lookup_component={components_getter}
            lookup_alternative={lookup_alternative}
        />

        {/* <GraphViewer components={components} perspective={perspective} /> */}
    </>
}
