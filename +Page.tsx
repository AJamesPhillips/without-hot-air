import { get_body_preview } from "../../utils/get_body_preview"
import { post_slugs } from "../blog/@slug/post_slugs"
import { pages } from "./@slug/pages"
import "./withouthotair.css"


export default function Posts()
{
    return <>
        <p>
            This is a temporary page of Professor David Mackay's book Sustainable
            Energy Without the Hot Air.  <b style={{ color: "red" }}>Links to this page will likely break in the near future.</b>
        </p>
        <h1>
            Without The Hot Air
        </h1>
        <p>
            This section of the website is entirely based on Prof. David MacKay's work.
            It is offered with deep gratitude for the emails
            over the years and his book <a href="https://www.withouthotair.com">"Sustainable
            Energy Without the Hot Air"</a> which was a great source of knowledge, and inspiring
            realism.
        </p>

        <p>
            It is offered here as a suggestion for how to ensure that the original
            knowledge continues to be built on by putting it into a
            wiki which will allow it to be kept up to date with the latest data from changes in
            policy, resources, technology, weather, energy utilisation, and economics.
        </p>

        <p>
            In <a href={post_slugs._2026_02_27_david_mackay_without_hot_air.path}>the initial post for
                this project I raised some questions</a>.
            I would be grateful for your assistance if you are in a position to help
            answer them.  Thanks!
        </p>

        {pages.map(page =>
        {
            const body_preview = get_body_preview(page)

            return <div key={page.slug}>
                <br />
                <a href={page.path} style={{ textDecoration: "none", color: "inherit" }}>
                    <article
                        key={page.slug}
                        style={{ cursor: "pointer" }}
                    >
                        <h2>{page.title}</h2>
                        <div>{body_preview}</div>
                    </article>
                </a>
                <br />
            </div>
        })}
    </>
}
