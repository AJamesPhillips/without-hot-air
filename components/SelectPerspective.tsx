

export type PerspectiveType = (
    "2009, MACKAY"
    | "WIKI"
)

interface SelectPerspectiveProps
{
    perspective: PerspectiveType
    on_change: (perspective: PerspectiveType) => void
}

export function SelectPerspective(props: SelectPerspectiveProps)
{
    const drop_down_options: { id: PerspectiveType, label: string }[] = [
        { id: "2009, MACKAY", label: "2009, Prof David MacKay" },
        { id: "WIKI", label: "Wiki" },
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
