

export type PerspectiveType = (
    "1239" // General
    | "1252" // 2009, MacKay
)

interface SelectPerspectiveProps
{
    perspective: PerspectiveType
    on_change: (perspective: PerspectiveType) => void
}

export function SelectPerspective(props: SelectPerspectiveProps)
{
    const drop_down_options: { id: PerspectiveType, label: string }[] = [
        { id: "1252", label: "2009, Prof. MacKay" },
        { id: "1239", label: "Wiki" },
    ]

    return <select
        value={props.perspective}
        onChange={e => props.on_change(e.target.value as PerspectiveType)}
    >
        {drop_down_options.map(option =>
            <option key={option.id} value={option.id}>
                {option.label}
            </option>
        )}
    </select>
}
