

export const perspective_general = "1239" as const
export const perspective_2009_mackay = "1252" as const

export type PerspectiveType = (
    typeof perspective_general
    | typeof perspective_2009_mackay
)

interface SelectPerspectiveProps
{
    perspective: PerspectiveType
    on_change: (perspective: PerspectiveType) => void
}

export function SelectPerspective(props: SelectPerspectiveProps)
{
    const drop_down_options: { id: PerspectiveType, label: string }[] = [
        { id: perspective_2009_mackay, label: "2009, Prof. MacKay" },
        { id: perspective_general, label: "Wiki" },
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
