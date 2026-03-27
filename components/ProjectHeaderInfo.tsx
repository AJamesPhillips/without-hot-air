import { without_hot_air_url } from "../constants"
import { maybe_document_pathname } from "../utils/maybe_document_pathname"


export function ProjectHeaderInfo()
{
    const show_link = maybe_document_pathname() !== without_hot_air_url
    const link = show_link ? <a href={without_hot_air_url}>This project</a> : "This project"

    return <p className="context-box">
        {link} is inspired by Professor
        David MacKay's book <a href="https://www.withouthotair.com">Sustainable
        Energy Without the Hot Air</a>. <b>This project page will likely move in the near future.</b>
    </p>
}
