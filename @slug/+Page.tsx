import { useData } from "vike-react/useData"

import { notes_factory } from "../../../components/footnote"
import { body_to_jsx } from "../../../utils/body_to_jsx"
import "../withouthotair.css"
import { Data } from "./+data"
import { pages_by_slug } from "./pages"


export default function WithoutHotAirPage()
{
    const data = useData<Data>()
    const page = pages_by_slug[data.slug!]

    if (!page) return <div>Page not found</div>

    const notes = notes_factory()

    return <div>
        <article id="withouthotair">
            <p>
                This is a temporary page of Professor David Mackay's book Sustainable
                Energy Without the Hot Air.  <b style={{ color: "red" }}>Links to this page will likely break in the near future.</b> Please see <a href="/TEMPORARY_withouthotair">more information about the project here</a>.
            </p>
            <h1>
                {page.title}
            </h1>
            <div id="withouthotair-body">
                {body_to_jsx(page.body(notes, data.post_specific_data))}
                {notes.render_footnotes()}
            </div>
        </article>
    </div>
}
