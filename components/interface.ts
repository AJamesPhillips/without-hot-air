

export type EnergyFactorName = (
    "Car" |
    "Jet flights" |
    "Heating, cooling" |
    "Light" |
    "Gadgets" |
    "Food, farming, fertiliser" |
    "Stuff" |
    "Transporting stuff" |
    "Defence" |
    "Onshore wind" |
    "Solar heating" |
    "PV residential" |
    "PV farm" |
    "Biomass: food, biofuel, wood, waste incineration, landfill gas" |
    "Shallow offshore wind" |
    "Deep offshore wind" |
    "Wave" |
    "Tide" |
    "Geothermal"
)

export interface EnergyFactor
{
    name: EnergyFactorName
    font_size: number
    kWh_per_day_per_person: number
    type: "sink" | "source" | "weak_source"
    link: string
    error?: string
}
