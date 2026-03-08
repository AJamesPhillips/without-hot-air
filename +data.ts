// https://vike.dev/data
import type { PageContextServer } from "vike/types"
import { load_data } from "./+Page"


export type Data = Awaited<ReturnType<typeof data>>

export async function data(_page_context: PageContextServer)
{
    // Get post specific data
    const post_specific_data = await load_data()

    return { post_specific_data }
}
