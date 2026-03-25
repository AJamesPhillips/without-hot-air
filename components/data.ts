import { IdOnly } from "../../../wikisim-core/src/data/id"
import { EnergyFactorName } from "./interface"


const uk_budget_general = new IdOnly(1239)
const uk_budget_mackay_2009 = new IdOnly(1252)

const cars_uk = new IdOnly(1205) //v3")
const planes_uk = new IdOnly(1209) //v5")
const heating_cooling_uk = new IdOnly(1220) //v4")
const lighting_uk = new IdOnly(1227) //v2")
const gadgets_uk = new IdOnly(1228) //v2")
const food_and_farming_uk = new IdOnly(1229) //v2")
const producing_stuff_uk = new IdOnly(1230) //v3")
const transporting_stuff_uk = new IdOnly(1231) //v2")
const public_services_uk = new IdOnly(1232) //v1")

const onshore_wind = new IdOnly(1206) //v3")
const solar_heating_potential_per_person_UK = new IdOnly(1191) //v5")
const solar_residential_pv_potential_per_person_UK = new IdOnly(1202) //v4")
const solar_farm_pv_potential_per_person_UK = new IdOnly(1204) //v3")
const biofuel_potential_per_person_UK = new IdOnly(1210) //v4")
const hydro_UK = new IdOnly(1221) //v3")
const shallow_offshore_wind_UK = new IdOnly(1222) //v6")
const deep_offshore_wind_UK = new IdOnly(1223) //v4")
const wave_UK = new IdOnly(1224) //v3")
const tide_UK = new IdOnly(1225) //v2")
const geothermal_UK = new IdOnly(1226) //v2")

export const ids = [
    uk_budget_general,
    uk_budget_mackay_2009,

    // cars_uk,
    // planes_uk,
    // heating_cooling_uk,
    // lighting_uk,
    // gadgets_uk,
    // food_and_farming_uk,
    // producing_stuff_uk,
    // transporting_stuff_uk,

    // onshore_wind,
    // solar_heating_potential_per_person_UK,
    // solar_residential_pv_potential_per_person_UK,
    // solar_farm_pv_potential_per_person_UK,
    // biofuel_potential_per_person_UK,
    // hydro_UK,
    // shallow_offshore_wind_UK,
    // deep_offshore_wind_UK,
    // wave_UK,
    // tide_UK,
    // geothermal_UK,
]


// export const ids_map = {
//     uk_budget_general,
//     uk_budget_mackay_2009,

//     // cars_uk,
//     // planes_uk,
//     // heating_cooling_uk,
//     // lighting_uk,
//     // gadgets_uk,
//     // food_and_farming_uk,
//     // producing_stuff_uk,
//     // transporting_stuff_uk,

//     // onshore_wind,
//     // solar_heating_potential_per_person_UK,
//     // solar_residential_pv_potential_per_person_UK,
//     // solar_farm_pv_potential_per_person_UK,
//     // biofuel_potential_per_person_UK,
//     // hydro_UK,
//     // shallow_offshore_wind_UK,
//     // deep_offshore_wind_UK,
//     // wave_UK,
//     // tide_UK,
//     // geothermal_UK,
// }


// console.assert(ids.length === Object.keys(ids_map).length, "Ids array and ids_map should have the same number of entries")


export const map_factor_name_to_id: Record<EnergyFactorName, IdOnly | undefined> = {
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
