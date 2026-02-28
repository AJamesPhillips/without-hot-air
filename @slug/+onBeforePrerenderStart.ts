import { pages } from "./pages"

export default function onBeforePrerenderStart(): string[]
{
    return pages.map(post => `/TEMPORARY_withouthotair/${post.slug}`)
}
