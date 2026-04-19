

export function get_DOM_parser()
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
