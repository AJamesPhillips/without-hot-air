import { useState } from "react"

import { DataComponentsGetter } from "../../../utils/data_components_json_to_map"
import { EnergyBoxesHelper } from "./EnergyBoxesHelper"
import { PerspectiveType, SelectPerspective } from "./SelectPerspective"



export function NationalEnergy(props: { components: DataComponentsGetter })
{
    const { components } = props
    const [perspective, set_perspective] = useState<PerspectiveType>("2009, MACKAY")

    return <>
        {(5 < Math.random()) && <SelectPerspective
            perspective={perspective}
            on_change={set_perspective}
        />}

        <EnergyBoxesHelper
            render_up_to="Geothermal"
            data_getter={components}
        />
    </>
}
