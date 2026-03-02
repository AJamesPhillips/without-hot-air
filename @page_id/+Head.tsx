import { useData } from "vike-react/useData"

import "../withouthotair.css"
import { Data } from "./+data"
import { pages_by_id } from "./pages"


export function Head()
{
    const data = useData<Data>()
    const page = pages_by_id[data.page_id!]

    if (!page) return null

    const { title } = page

    return <>
        {/* {img_url ? <meta property="og:image" content={img_url} /> : null} */}
        <meta name="description" content={title} />
        <meta property="og:description" content={title} />
    </>
}
