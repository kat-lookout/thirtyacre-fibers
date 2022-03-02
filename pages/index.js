import Container from '/components/container'
import Head from 'next/head'
import Layout from '/components/layout'
import CurrentProjects from '/components/current-projects'
import FinishedObjects from '/components/finished-objects'
import { getAllProjects } from '/lib/projectAPI'

export default function Index({ allProjects }) {
    const currentProjects = allProjects.filter((project) => project?.completeDate === undefined)
    const finishedObjects = allProjects.filter((project) => project?.completeDate !== undefined)
                                        .sort((a, b) => (
                                            a.completeDate < b.completeDate ? 1 :
                                            a.completeDate > b.completeDate ? -1 :
                                            a.startDate < b.startDate ? 1 :
                                            a.startDate > b.startDate ? -1 : 0
                                        )).slice(-3)

    // Sort FOs by completeDate then startDate in descending order.


    return (
        <>
            <Layout>
                <Head>
                    <title>Thirtyacre Fibers</title>
                </Head>
                <Container>
                    <div className="flex flex-col justify-center items-center mb-6">
                        <img src="/img/logo.png" width="806px" height="269px" alt="Thirtyacre Fibers" />
                        <p>Fiber artist. Software developer. Cat lover. General nerd.</p>
                    </div>
                    {currentProjects.length > 0 && <CurrentProjects projects={currentProjects} />}
                    {finishedObjects.length > 0 && <FinishedObjects objects={finishedObjects} />}
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

