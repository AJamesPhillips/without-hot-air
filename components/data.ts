import { IdAndVersion } from "../../../wikisim-core/src/data/id"
import { EnergyFactorName } from "./interface"



export const cars_uk = IdAndVersion.from_str("1205v3")
export const planes_uk = IdAndVersion.from_str("1209v5")
export const heating_cooling_uk = IdAndVersion.from_str("1220v4")
export const lighting_uk = IdAndVersion.from_str("1227v2")
export const gadgets_uk = IdAndVersion.from_str("1228v2")
export const food_and_farming_uk = IdAndVersion.from_str("1229v2")
export const producing_stuff_uk = IdAndVersion.from_str("1230v3")
export const transporting_stuff_uk = IdAndVersion.from_str("1231v2")
export const public_services_uk = IdAndVersion.from_str("1232v1")

export const onshore_wind = IdAndVersion.from_str("1206v3")
export const solar_heating_potential_per_person_UK = IdAndVersion.from_str("1191v5")
export const solar_residential_pv_potential_per_person_UK = IdAndVersion.from_str("1202v4")
export const solar_farm_pv_potential_per_person_UK = IdAndVersion.from_str("1204v3")
export const biofuel_potential_per_person_UK = IdAndVersion.from_str("1210v4")
export const hydro_UK = IdAndVersion.from_str("1221v3")
export const shallow_offshore_wind_UK = IdAndVersion.from_str("1222v6")
export const deep_offshore_wind_UK = IdAndVersion.from_str("1223v4")
export const wave_UK = IdAndVersion.from_str("1224v3")
export const tide_UK = IdAndVersion.from_str("1225v2")
export const geothermal_UK = IdAndVersion.from_str("1226v2")

export const ids = [
    cars_uk,
    planes_uk,
    heating_cooling_uk,
    lighting_uk,
    gadgets_uk,
    food_and_farming_uk,
    producing_stuff_uk,
    transporting_stuff_uk,

    onshore_wind,
    solar_heating_potential_per_person_UK,
    solar_residential_pv_potential_per_person_UK,
    solar_farm_pv_potential_per_person_UK,
    biofuel_potential_per_person_UK,
    hydro_UK,
    shallow_offshore_wind_UK,
    deep_offshore_wind_UK,
    wave_UK,
    tide_UK,
    geothermal_UK,
]


export const ids_map = {
    cars_uk,
    planes_uk,
    heating_cooling_uk,
    lighting_uk,
    gadgets_uk,
    food_and_farming_uk,
    producing_stuff_uk,
    transporting_stuff_uk,

    onshore_wind,
    solar_heating_potential_per_person_UK,
    solar_residential_pv_potential_per_person_UK,
    solar_farm_pv_potential_per_person_UK,
    biofuel_potential_per_person_UK,
    hydro_UK,
    shallow_offshore_wind_UK,
    deep_offshore_wind_UK,
    wave_UK,
    tide_UK,
    geothermal_UK,
}


console.assert(ids.length === Object.keys(ids_map).length, "Ids array and ids_map should have the same number of entries")


export const map_name_to_id_and_version: Record<EnergyFactorName, IdAndVersion | undefined> = {
    "Car": cars_uk,
    "Jet flights": planes_uk,
    "Heating, cooling": heating_cooling_uk,
    "Light": lighting_uk,
    "Gadgets": gadgets_uk,
    "Food, farming, fertiliser": food_and_farming_uk,
    "Stuff": producing_stuff_uk,
    "Transporting stuff": transporting_stuff_uk,
    "Defence": public_services_uk,

    "Onshore wind": onshore_wind,
    "Solar heating": solar_heating_potential_per_person_UK,
    "PV residential": solar_residential_pv_potential_per_person_UK,
    "PV farm": solar_farm_pv_potential_per_person_UK,
    "Biomass: food, biofuel, wood, waste incineration, landfill gas": biofuel_potential_per_person_UK,
    "Hydroelectricity": hydro_UK,
    "Shallow offshore wind": shallow_offshore_wind_UK,
    "Deep offshore wind": deep_offshore_wind_UK,
    "Wave": wave_UK,
    "Tide": tide_UK,
    "Geothermal": geothermal_UK,
}
