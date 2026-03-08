import { useData } from "vike-react/useData"

import { __dangerously_get_wikisim_components } from "../../utils/__dangerously_get_wikisim_components"
import { data_components_json_to_getter } from "../../utils/data_components_json_to_map"
import { get_body_preview } from "../../utils/get_body_preview"
import { DataComponentAsJSON } from "../../wikisim-core/src/supabase"
import { pages } from "./@page_id/pages"
import { ids } from "./components/data"
import { EnergyBoxesHelper } from "./components/EnergyBoxesHelper"
import { article_path_on_ajp_personal } from "./constants"
import "./withouthotair.css"


export const load_data = () => __dangerously_get_wikisim_components(ids)


export default function Posts()
{
    const data = useData<{ post_specific_data: DataComponentAsJSON[] }>()
    const components = data_components_json_to_getter(data.post_specific_data)

    return <>
        <p>
            This is a temporary page of Professor David MacKay's book Sustainable
            Energy Without the Hot Air.  <b style={{ color: "red" }}>Links to this page will likely break in the near future.</b>
        </p>
        <h1>
            Without The Hot Air
        </h1>
        <p>
            This section of the website is entirely based on Prof. David MacKay's work.
            It is offered with deep gratitude for the emails
            over the years and his book <a href="https://www.withouthotair.com">"Sustainable
            Energy Without the Hot Air"</a> which was a great source of knowledge, and inspiring
            realism.
        </p>

        <p>
            It is offered here as a suggestion for how to ensure that the original
            knowledge continues to be built on by putting it into a
            wiki which will allow it to be kept up to date with the latest data from changes in
            policy, resources, technology, weather, energy utilisation, and economics.
        </p>

        <p>
            In <a href={article_path_on_ajp_personal}>the initial post for
                this project I raised some questions</a>.
            I would be grateful for your assistance if you are in a position to help
            answer them.  Thanks!
        </p>

        <hr />

        <h2>UK Energy Summary</h2>

        <p>
            This page will contain all the sources of energy demand and supply
            that Professor MacKay had included in his summary
            on <a href="https://www.withouthotair.com/c18/page_103.shtml">page 103</a>.
        </p>

        <EnergyBoxesHelper
            render_up_to="Geothermal"
            data_getter={components}
        />

        <br />
        <br />

        <hr />

        <br />
        <br />

        <p>
            Example of how a chapter could be updated to include links to
            individual pages for all data points and calculations:
        </p>

        {pages.map(page =>
        {
            const body_preview = get_body_preview(page)

            return <div key={page.page_id}>
                <br />
                <a href={page.path} style={{ textDecoration: "none", color: "inherit" }}>
                    <article
                        key={page.page_id}
                        style={{ cursor: "pointer" }}
                    >
                        <h2>{page.title}</h2>
                        <div>{body_preview}</div>
                    </article>
                </a>
                <br />
            </div>
        })}
    </>
}
