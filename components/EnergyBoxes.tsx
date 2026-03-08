import { format_number_to_significant_figures } from "../../../wikisim-core/src/data/format/format_number_to_significant_figures"
import { EnergyFactor } from "./interface"


const hf = 5
export function EnergyBoxes(props: { factors: EnergyFactor[] })
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

    const height = factor.error ? 10 : factor.kWh_per_day_per_person

    const background_color = factor.error ? "lightgray"
        : factor.type === "sink" ? "rgb(255, 220, 220)"
        : factor.type === "source" ? "lightgreen"
        : "rgb(230, 255, 230)"

    return <div
        title={factor.error}
        style={{
            height: height * hf,
            border: "thin solid " + (factor.error ? "black" : (factor.type === "sink" ? "red" : "green")),
            backgroundColor: background_color,
            width: 150,
        }}
    >
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
    const { factor } = props

    return <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        fontSize: factor.font_size,
    }}>
        {factor.name}:
        <b>{format_number_to_significant_figures(factor.kWh_per_day_per_person, 2)} kWh/d</b>
    </div>
}
