import { IdOnly } from "../../../wikisim-core/src/data/id"
import { DataComponent } from "../../../wikisim-core/src/data/interface"



type LookupResult = false | { type: "original", alternative: false } | { type: "alternative", alternative: IdOnly }
export type LookupAlternative = (component_id: number) => LookupResult
export function factory_lookup_alternative(components: DataComponent[]): LookupAlternative
{
    const map = new Map<number, LookupResult>()

    function add_to_map(component: DataComponent)
    {
        map.set(component.id.id, { type: "original", alternative: false })
        if (component.subject_id)
        {
            map.set(component.subject_id, { type: "alternative", alternative: new IdOnly(component.id.id) })
        }
    }

    components.map(add_to_map)

    return (component_id: number): LookupResult =>
    {
        const result = map.get(component_id)
        return result || false
    }
}
