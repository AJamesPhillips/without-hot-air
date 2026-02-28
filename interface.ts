import { JSX } from "react"

import { Notes } from "../../components/footnote"


export interface Page<D = unknown>
{
    slug: string
    path: string
    title: string
    get_data?: () => Promise<D>
    body: (notes: Notes, data?: D) => string | JSX.Element
}
