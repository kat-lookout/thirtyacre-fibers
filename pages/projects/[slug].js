import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '/components/container'
import ProjectBody from '/components/project-body'
import Header from '/components/header'
import ProjectHeader from '/components/project-header'
import Layout from '/components/layout'
import { getProjectBySlug, getAllProjects } from '/lib/projectAPI'
import ProjectTitle from '/components/project-title'
import Head from 'next/head'
import markdownToHtml from '/lib/markdownToHtml'

export default function Project({ project, moreProjects }) {
    const router = useRouter()
    if (!router.isFallback && !project?.slug) {
        return <ErrorPage statusCode={404} />
    }
    
    return (
        <Layout>
            <Container>
                {router.isFallback ? (
                    <ProjectTitle>Loading...</ProjectTitle>
                ) : (
                    <>
                        <article className="mb-32">
                            <Head>
                                <title>{project.name} | Thirtyacre Fibers Project</title>
                            </Head>
                            <ProjectHeader
                                title={project.name}
                                coverImage={project.coverImage}
                                updateDate={project.updateDate}
                            />
                            <ProjectBody content={project.content} />
                        </article>
                    </>
                )}
            </Container>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const project = getProjectBySlug(params.slug, [
        'name',
        'startDate',
        'completeDate',
        'updateDate',
        'slug',
        'content',
        'coverImage'
    ])
    
    const content = await markdownToHtml(project.content || '')

    return {
        props: {
            project: {
                ...project,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const projects = getAllProjects(['slug'])
    
    return {
        paths: projects.map((project) => {
            return {
                params: {
                    slug: project.slug,
                },
            }
        }),
        fallback: false,
    }
}