import type { Page } from "../interface"
import { chapter_6 } from "./pages/chapter_6"
import { national_energy } from "./pages/national_energy"


export const pages: Page[] = []


function new_page(page: Page<any>)
{
    pages.push(page)
}


new_page(national_energy)
new_page(chapter_6)


export const pages_by_id: Record<string, Page> = Object.fromEntries(
    pages.map(page => [page.page_id, page])
)
