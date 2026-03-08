
import { DataComponentsGetter } from "../../../utils/data_components_json_to_map"
import { map_name_to_id_and_version } from "./data"
import { EnergyBoxes } from "./EnergyBoxes"
import { EnergyFactor, EnergyFactorName } from "./interface"



function all_factors(): EnergyFactor[]
{
    const ordered_factors_map: { [N in EnergyFactorName]: Pick<EnergyFactor, "type" | "font_size"> } = {
        "Car": { type: "sink", font_size: 14 },
        "Jet flights": { type: "sink", font_size: 14 },
        "Heating, cooling": { type: "sink", font_size: 14 },
        "Light": { type: "sink", font_size: 14 },
        "Gadgets": { type: "sink", font_size: 14 },
        "Food, farming, fertiliser": { type: "sink", font_size: 14 },
        "Stuff": { type: "sink", font_size: 14 },
        "Transporting stuff": { type: "sink", font_size: 14 },
        "Defence": { type: "sink", font_size: 14 },
        "Onshore wind": { type: "source", font_size: 14 },
        "Solar heating": { type: "weak_source", font_size: 14 },
        "PV residential": { type: "source", font_size: 10 },
        "PV farm": { type: "source", font_size: 14 },
        "Biomass: food, biofuel, wood, waste incineration, landfill gas": { type: "source", font_size: 14 },
        "Shallow offshore wind": { type: "source", font_size: 14 },
        "Deep offshore wind": { type: "source", font_size: 14 },
        "Wave": { type: "source", font_size: 14 },
        "Tide": { type: "source", font_size: 14 },
        "Geothermal": { type: "source", font_size: 14 },
    }

    const ordered_factors: EnergyFactor[] = Object.entries(ordered_factors_map)
        .map(([name, attributes]) => ({
            name: name as EnergyFactorName,
            ...attributes,
            kWh_per_day_per_person: 0,
            link: "",
        }))

    return ordered_factors
}


function factors_up_to(name: EnergyFactorName): EnergyFactor[]
{
    const factors = all_factors()
    const index = factors.findIndex(f => f.name === name)
    if (index === -1) throw new Error(`Unknown factor name ${name}`)
    return factors.slice(0, index + 1)
}


function factors_up_to_with_data(name: EnergyFactorName, data_getter: DataComponentsGetter): EnergyFactor[]
{
    const factors = factors_up_to(name)
    factors.forEach(factor =>
    {
        const id_and_version = map_name_to_id_and_version[factor.name]
        if (!id_and_version)
        {
            factor.error = `No component IdAndVersion for factor ${factor.name}`
            return
        }
        factor.link = id_and_version.to_url()

        if (!data_getter)
        {
            factor.error = `No data component getter provided`
            return
        }

        const data_component = data_getter(id_and_version)
        if (!data_component)        {
            factor.error = `Data component not found for IdAndVersion ${id_and_version.to_str()}`
            return
        }

        const value = parseInt(data_component.result_value || "")
        if (Number.isNaN(value))
        {
            factor.error = `Result value for component ${id_and_version.to_str()} is not a number: ${data_component.result_value}`
            return
        }

        factor.kWh_per_day_per_person = value
    })

    return factors
}


export function EnergyBoxesHelper(props: { render_up_to: EnergyFactorName, data_getter: DataComponentsGetter })
{
    const factors = factors_up_to_with_data(props.render_up_to, props.data_getter)

    return <EnergyBoxes factors={factors} />
}
