import { IdAndVersion } from "../../../../wikisim-core/src/data/id"
import { DataComponentAsJSON } from "../../../../wikisim-core/src/supabase"

import { factory_anchor_tag } from "../../../../components/DataComponentToString"
import { __dangerously_get_wikisim_components } from "../../../../utils/__dangerously_get_wikisim_components"
import { data_components_json_to_getter } from "../../../../utils/data_components_json_to_map"
import { Page } from "../../interface"


const power_of_sunlight = IdAndVersion.from_str("1180v1")
const average_sunshine_power_on_roof = IdAndVersion.from_str("1181v1")
const efficiency_of_solar_hot_water = IdAndVersion.from_str("1194v1")
const area_south_roofs_per_person_UK = IdAndVersion.from_str("1192v1")
const average_solar_power_per_area_south_roofs_UK = IdAndVersion.from_str("1181v1")
const solar_heating_potential_per_person_UK = IdAndVersion.from_str("1191v4")
const ids = [
    power_of_sunlight,
    average_sunshine_power_on_roof,
    efficiency_of_solar_hot_water,
    area_south_roofs_per_person_UK,
    average_solar_power_per_area_south_roofs_UK,
    solar_heating_potential_per_person_UK,
]

export const chapter_6: Page<DataComponentAsJSON[]> = {
    title: "Chapter 6: Solar",
    slug: "solar",
    path: "/TEMPORARY_withouthotair/solar",
    get_data: () => __dangerously_get_wikisim_components(ids),
    body: (_notes, data) =>
    {
        const components = data_components_json_to_getter(data)
        const anchor_tag = factory_anchor_tag(components, true)

        return <>
            <p>
                <a href="https://www.withouthotair.com/c6/page_38.shtml">Original chapter 6</a>
            </p>
            <p>
                We are estimating how our consumption stacks up against conceivable
                sustainable production. In the last three chapters we found car-driving and
                plane-flying to be bigger than the plausible on-shore wind-power potential
                of the United Kingdom. Could solar power put production back in the
                lead?
            </p>
            <p>
                The {anchor_tag(power_of_sunlight, { format: "%T is %V" })}.
                That's {anchor_tag(power_of_sunlight, { format: "%V" })} of area oriented towards the sun, not
                per m2 of land area. To get the power per m2 of land area in Britain, we
                must make several corrections. We need to compensate for the tilt between
                the sun and the land, which reduces the intensity of midday sun to
                about <Claim>60%</Claim> of its value at the equator (figure 6.1). We also lose out because it is
                not midday all the time. On a cloud-free day in March or September, the
                ratio of the average intensity to the midday intensity is about <Claim>32%</Claim>. Finally,
                we lose power because of cloud cover. In a typical UK location the sun
                shines during just <Claim>34%</Claim> of daylight hours.
            </p>
            <p>
                The combined effect of these three factors and the additional compli-
                cation of the wobble of the seasons is that the average raw power of sunshine
                per square metre of south-facing roof in Britain is roughly {anchor_tag(average_sunshine_power_on_roof, { format: "%V" })},
                and the average raw power of sunshine per square metre of flat ground is
                roughly <Claim>100 W/m2</Claim>.
            </p>
            <p>
                We can turn this raw power into useful power in four ways:

                <ul>
                    <li>1. Solar thermal: using the sunshine for direct heating of buildings or
                        water.</li>
                    <li>2. Solar photovoltaic: generating electricity.</li>
                    <li>3. Solar biomass: using trees, bacteria, algae, corn, soy beans, or oilseed
                        to make energy fuels, chemicals, or building materials.</li>
                    <li>4. Food: the same as solar biomass, except we shovel the plants into
                        humans or other animals.</li>
                </ul>
            </p>
            <p>
                (In a later chapter we'll also visit a couple of other solar power techniques
                appropriate for use in deserts.)
            </p>
            <p>
                Let's make quick rough estimates of the maximum plausible powers
                that each of these routes could deliver. We'll neglect their economic costs,
                and the energy costs of manufacturing and maintaining the power facilities.
            </p>

            <h3>Solar thermal</h3>

            <p>
                The simplest solar power technology is a panel making hot water. Let's
                imagine we cover <i>all</i> south-facing roofs with solar thermal panels - that
                would be about {anchor_tag(area_south_roofs_per_person_UK, { format: "%V of panels per person" })} - and let's assume these
                are {anchor_tag(efficiency_of_solar_hot_water, { format: "%V" })}-efficient at turning the sunlight's {anchor_tag(average_sunshine_power_on_roof, { format: "%V" })} into hot water (figure 6.3).
            </p>
            <p>
                Multiplying
            </p>
            <p style={{ textAlign: "center" }}>
                {anchor_tag(efficiency_of_solar_hot_water, { format: "%V" })} × {anchor_tag(area_south_roofs_per_person_UK, { format: "%V" })} × {anchor_tag(average_solar_power_per_area_south_roofs_UK, { format: "%V" })}
            </p>
            <p>
                we find solar heating could deliver
            </p>
            <p style={{ textAlign: "center" }}>
                {anchor_tag(solar_heating_potential_per_person_UK, { format: "%V" })}
            </p>
            <p>
                I colour this production box white in figure 6.4 to indicate that it describes
                production of low-grade energy - hot water is not as valuable as the highgrade
                electrical energy that wind turbines produce. Heat can't be exported
                to the electricity grid. If you don't need it, then it's wasted. We should bear
                in mind that much of this captured heat would not be in the right place.
                In cities, where many people live, residential accommodation has less roof
                area per person than the national average. Furthermore, this power would
                be delivered non-uniformly through the year.
            </p>
            <EnergyBoxes factors={[
                { name: "Car", kWh_per_day: 40, type: "sink" },
                { name: "Jet flights", kWh_per_day: 30, type: "sink" },
                { name: "Wind", kWh_per_day: 20, type: "source" },
                { name: "Solar heating", kWh_per_day: 13, type: "weak_source", link: solar_heating_potential_per_person_UK.to_url()},
            ]} />
        </>
    },
}



function Claim (props: { children: React.ReactNode })
{
    return <span style={{ fontStyle: "italic", textDecoration: "underline dotted" }}>
        {props.children}
    </span>
}


interface EnergyFactor
{
    name: string
    kWh_per_day: number
    type: "sink" | "source" | "weak_source"
    link?: string
}


const hf = 5
function EnergyBoxes(props: { factors: EnergyFactor[] })
{
    // Display each factor as a box of the appropriate height.
    const sinks = props.factors.filter(f => f.type === "sink").reverse()
    const sources = props.factors.filter(f => f.type !== "sink").reverse()

    return <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexDirection: "row" }}>
        <div style={{ display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
            {sinks.map((factor, i) => <FactorToBox
                key={i}
                factor={factor}
            />)}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", flexDirection: "column" }}>
            {sources.map((factor, i) => <FactorToBox
                key={i}
                factor={factor}
            />)}
        </div>
    </div>
}


const factor_wrap_style: React.CSSProperties = {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    padding: 8,
}

function FactorToBox(props: { factor: EnergyFactor })
{
    const { factor } = props

    return <div style={{
        height: factor.kWh_per_day * hf,
        border: "thin solid " + (factor.type === "sink" ? "red" : "green"),
        backgroundColor: factor.type === "sink" ? "rgb(255, 220, 220)" : factor.type === "source" ? "lightgreen" : "white",
        width: 150,
    }}>
        {factor.link
            ? <a
                href={factor.link}
                target="_blank"
                rel="noopener noreferrer"
                style={factor_wrap_style}
            >
                <FactorToText factor={factor} />
            </a>
            : <FactorToText factor={factor} />}
    </div>
}


function FactorToText(props: { factor: EnergyFactor })
{
    return <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    }}>
        {props.factor.name}:
        <b>{props.factor.kWh_per_day} kWh/d</b>
    </div>
}
