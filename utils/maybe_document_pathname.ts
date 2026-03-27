

export function maybe_document_pathname()
{
    if (typeof document === "undefined")
    {
        return ""
    }
    else
    {
        return document.location.pathname
    }
}
