import { useData } from "vike-react/useData"

import "../withouthotair.css"
import { Data } from "./+data"
import { pages_by_slug } from "./pages"


export function Head()
{
    const data = useData<Data>()
    const page = pages_by_slug[data.slug!]

    if (!page) return null

    const { title } = page

    return <>
        {/* {img_url ? <meta property="og:image" content={img_url} /> : null} */}
        <meta name="description" content={title} />
        <meta property="og:description" content={title} />
    </>
}
