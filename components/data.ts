import { IdAndVersion } from "../../../wikisim-core/src/data/id"
import { EnergyFactorName } from "./interface"



export const cars_uk = IdAndVersion.from_str("1205v1")
export const planes_uk = IdAndVersion.from_str("1209v1")

export const onshore_wind = IdAndVersion.from_str("1206v1")
export const solar_heating_potential_per_person_UK = IdAndVersion.from_str("1191v4")
export const solar_residential_pv_potential_per_person_UK = IdAndVersion.from_str("1202v1")
export const solar_farm_pv_potential_per_person_UK = IdAndVersion.from_str("1204v1")
export const biofuel_potential_per_person_UK = IdAndVersion.from_str("1210v1")

export const ids = [
    cars_uk,
    planes_uk,

    onshore_wind,
    solar_heating_potential_per_person_UK,
    solar_residential_pv_potential_per_person_UK,
    solar_farm_pv_potential_per_person_UK,
    biofuel_potential_per_person_UK,
]


export const map_name_to_id_and_version: Record<EnergyFactorName, IdAndVersion | undefined> = {
    "Car": cars_uk,
    "Jet flights": planes_uk,
    "Heating, cooling": undefined,
    "Light": undefined,
    "Gadgets": undefined,
    "Food, farming, fertiliser": undefined,
    "Stuff": undefined,
    "Transporting stuff": undefined,
    "Defence": undefined,
    "Onshore wind": onshore_wind,
    "Solar heating": solar_heating_potential_per_person_UK,
    "PV residential": solar_residential_pv_potential_per_person_UK,
    "PV farm": solar_farm_pv_potential_per_person_UK,
    "Biomass: food, biofuel, wood, waste incineration, landfill gas": biofuel_potential_per_person_UK,
    "Shallow offshore wind": undefined,
    "Deep offshore wind": undefined,
    "Wave": undefined,
    "Tide": undefined,
    "Geothermal": undefined,
}
