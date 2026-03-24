import { useData } from "vike-react/useData"

import { notes_factory } from "../../../components/footnote"
import { body_to_jsx } from "../../../utils/body_to_jsx"
import { ProjectHeaderInfo } from "../components/ProjectHeaderInfo"
import "../withouthotair.css"
import { Data } from "./+data"
import { pages_by_id } from "./pages"


export default function WithoutHotAirPage()
{
    const data = useData<Data>()
    const page = pages_by_id[data.page_id!]

    if (!page) return <div>Page not found</div>

    const notes = notes_factory()

    return <div>
        <ProjectHeaderInfo />
        <article id="withouthotair">
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
