// https://vike.dev/data
import { useConfig } from "vike-react/useConfig"
import type { PageContextServer } from "vike/types"

import { pages_by_id } from "./pages"


export type Data = Awaited<ReturnType<typeof data>>

export async function data(pageContext: PageContextServer)
{
    const page = pages_by_id[pageContext.routeParams.page_id!]

    // For some reason this call to `useConfig` must come before the async
    // call to `post.get_data()`, otherwise a "Invalid hook call" error occurs.
    // https://vike.dev/useConfig
    const config = useConfig()

    // Get post specific data
    let post_specific_data
    if (page?.get_data)
    {
        post_specific_data = await page.get_data()
    }

    config({
        // Set <title>
        title: page?.title,
    })

    return { page_id: page?.page_id, post_specific_data }
}
