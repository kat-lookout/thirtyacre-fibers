import Container from '/components/container'
import Layout from '/components/layout'
import ProjectPreview from '/components/project-preview'
import Head from 'next/head'
import { getAllProjects } from '/lib/projectAPI'

export default function Projects({ allProjects }) {
    return (
        <>
            <Layout>
                <Head>
                    <title>Projects</title>
                </Head>
                <Container>
                    <section>
                        <h2 className="mb-8 text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-center">
                            Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                            { allProjects.map((project) => (
                                <ProjectPreview
                                    key={project.slug}
                                    title={project.name}
                                    coverImage={project.coverImage}
                                    startDate={project.startDate}
                                    updateDate={project.updateDate}
                                    slug={project.slug}
                                />
                            ))}
                        </div>
                    </section>
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const allProjects = getAllProjects([
        'name',
        'startDate',
        'updateDate',
        'completeDate',
        'slug',
        'coverImage',
    ])
    
    return {
        props: { allProjects }
    }
}
