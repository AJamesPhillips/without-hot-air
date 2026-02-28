import type { Page } from "../interface"
import { chapter_6 } from "./pages/chapter_6"


export const pages: Page[] = []


function new_page(page: Page<any>)
{
    pages.unshift(page)
}


new_page(chapter_6)


export const pages_by_slug: Record<string, Page> = Object.fromEntries(
    pages.map(page => [page.slug, page])
)


// export function get_previous_and_next_pages(current_page_slug: string): { previous_page: Page | undefined, next_page: Page | undefined }
// {
//     const current_index = pages
//         .findIndex(page => page.slug === current_page_slug)
//     if (current_index === -1) return { previous_page: undefined, next_page: undefined }


//     const next_page = current_index > 0 ? pages[current_index - 1] : undefined
//     const previous_page = current_index < pages.length - 1 ? pages[current_index + 1] : undefined

//     return { previous_page, next_page }
// }
