import { DataComponentAsJSON } from "../../../../wikisim-core/src/supabase"

import { factory_anchor_tag } from "../../../../components/DataComponentToString"
import { __dangerously_get_wikisim_components } from "../../../../utils/__dangerously_get_wikisim_components"
import { data_components_json_to_getter } from "../../../../utils/data_components_json_to_map"
import {
    ids,
    solar_heating_potential_per_person_UK,
} from "../../components/data"
import { EnergyBoxesHelper } from "../../components/EnergyBoxesHelper"
import { Page } from "../../interface"



export const summary: Page<DataComponentAsJSON[]> = {
    title: "UK Energy Summary",
    page_id: "summary",
    path: "/TEMPORARY_withouthotair/summary",
    get_data: () => __dangerously_get_wikisim_components(ids),
    body: (_notes, data) =>
    {
        const components = data_components_json_to_getter(data)
        const anchor_tag = factory_anchor_tag(components, true)

        return <>
            <p>
                This page will contain all the sources of energy demand and supply
                that Professor MacKay had included in his summary
                on <a href="https://www.withouthotair.com/c18/page_103.shtml">page 103</a>.
            </p>

            <p>
                It uses values like {anchor_tag(solar_heating_potential_per_person_UK, { format: "%V for %T" })}.
            </p>

            <EnergyBoxesHelper
                render_up_to="Geothermal"
                data_getter={components}
            />
        </>
    },
}
