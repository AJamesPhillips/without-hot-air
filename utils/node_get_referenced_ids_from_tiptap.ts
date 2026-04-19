import { IdAndVersion } from "../../../wikisim-core/src/data/id"
import { shared_get_referenced_ids_from_tiptap } from "../../../wikisim-core/src/rich_text/shared_get_referenced_ids_from_tiptap"
import { get_DOM_parser } from "./get_DOM_parser"


export function node_get_referenced_ids_from_tiptap(tiptap_text: string): IdAndVersion[]
{
    const parser = get_DOM_parser()
    return shared_get_referenced_ids_from_tiptap(parser, tiptap_text)
}
