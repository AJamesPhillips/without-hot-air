import { chapter_6 } from "./@page_id/pages/chapter_6"
import { national_energy } from "./@page_id/pages/national_energy"
import { ProjectHeaderInfo } from "./components/ProjectHeaderInfo"
import { article_path_on_ajp_personal, national_energy_page } from "./constants"
import "./withouthotair.css"


export default function Posts()
{
    return <>
        <ProjectHeaderInfo />
        <h1>
            Revisiting Without The Hot Air
        </h1>
        <p>
            This work is based on Prof. David MacKay's book <a href="https://www.withouthotair.com">"Sustainable
            Energy Without the Hot Air"</a>.
            It is offered with deep gratitude for the emails
            over the years and his book which was a great source of inspiration, and
            grounding realism.
        </p>

        <p>
            This is an invitation for us to build together on the foundations of
            David's original work. With David's work being copied into a <a href="https://wikisim.org">wiki</a> we can now all contribute
            and keep it current as resources, technology, climate, energy use, policy,
            and economics evolve.
        </p>

        <p>
            Explore the <a href={national_energy_page.path}>interactive Energy Budget</a> or
            an <a href={chapter_6.path}>example chapter</a>.  See here for the <a href={article_path_on_ajp_personal + "#plan"}>project plan</a>.
        </p>

        <hr />

        <ArticleLink page={national_energy} />

        <ArticleLink page={chapter_6} />
    </>
}


function ArticleLink({ page }: { page: { title: string, summary_description?: string, path: string } })
{
    return <article
        style={{ cursor: "pointer" }}
    >
        <a href={page.path} style={{ }}>
            <h2>{page.title}</h2>
        </a>
        <a href={page.path} style={{ textDecoration: "none", color: "inherit" }}>
            <div>{page.summary_description}</div>
        </a>
    </article>
}
