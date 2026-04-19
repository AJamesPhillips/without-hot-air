import { useMemo } from "react"

import { DataComponentAsJSON } from "../../../../wikisim-core/src/supabase"

import { __dangerously_get_wikisim_components } from "../../../../utils/__dangerously_get_wikisim_components"
import { data_components_json_to_map } from "../../../../utils/data_components_json_to_map"
import { top_ids_to_fetch } from "../../components/data"
import { NationalEnergy } from "../../components/NationalEnergy"
import { national_energy_page } from "../../constants"
import { Page } from "../../interface"


export const national_energy: Page<DataComponentAsJSON[]> = {
    title: "UK National Energy",
    summary_description: "An interactive energy balance sheet for the UK",
    page_id: national_energy_page.id,
    path: national_energy_page.path,
    get_data: () => __dangerously_get_wikisim_components(top_ids_to_fetch),
    body: (_notes, data) =>
    {
        const components_map = useMemo(() => data_components_json_to_map(data), [data])
        const components = useMemo(() => Object.values(data_components_json_to_map(data || [])), [data])

        return <>
            <p>
                What national energy strategy could the UK take?  What plans add up?
            </p>
            <p>
                Let's get the numbers together in one place, where we can all see, edit,
                and keep them up to date.  Then we might be able to have a more informed
                discussion about the options for powering the UK and ensuring everyone prospers.
            </p>
            <ul>
                <li>
                    How has the demand side changed with:
                    <ul>
                        <li>
                            Increased electrification of transport and heating?
                        </li>
                        <li>
                            Increased efficiency of light, gadgets, heating and cooling?
                        </li>
                    </ul>
                </li>
                <li>
                    Can we only meet demand with nuclear power stations?
                </li>
                <li>
                    How has the supply side changed with:
                    <ul>
                        <li>
                            Larger wind turbines?
                        </li>
                        <li>
                            Cheaper solar panels?
                        </li>
                        <li>
                            Cheaper batteries? - domestic, car, grid scale?
                        </li>
                        <li>
                            Compressed air energy storage?  Redox flow batteries?
                        </li>
                        <li>
                            Increased population (all per capita numbers will be less on supply side?)
                        </li>
                    </ul>
                </li>
                <li>
                    How does the grid need to change?
                    <ul>
                        <li>
                            How much renewables energy is lost to curtailment?
                        </li>
                        <li>
                            How much energy is lost to storage inefficiency?
                        </li>
                        <li>
                            With less kinetic rolling mass, how resilient is the
                            grid to supply and demand shocks?
                        </li>
                    </ul>
                </li>
            </ul>

            <h2>The Energy Balance Sheet</h2>

            <p> </p>
            <p> </p>

            {components_map && <NationalEnergy components={components} components_map={components_map} />}
        </>
    },
}
