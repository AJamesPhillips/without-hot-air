import { IdAndVersion } from "../../../wikisim-core/src/data/id"
import { shared_get_referenced_ids_from_tiptap } from "../../../wikisim-core/src/rich_text/shared_get_referenced_ids_from_tiptap"


export function node_get_referenced_ids_from_tiptap(tiptap_text: string): IdAndVersion[]
{
    const parser = get_DOM_parser()
    return shared_get_referenced_ids_from_tiptap(parser, tiptap_text)
}


function get_DOM_parser()
{
    if (typeof window === "undefined")
    {
        // Running in Node.js, use JSDOM
        const { JSDOM } = require("jsdom")
        const { window } = new JSDOM("")
        return new window.DOMParser()
    }
    else
    {
        // Running in a browser, use the native DOMParser
        return new DOMParser()
    }
}
