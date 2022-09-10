import Container from '/components/container'
import Head from 'next/head'
import Layout from '/components/layout'
import PostPreview from '/components/post-preview'
import Link from 'next/link'

const importBlogPosts = async () => {
    const markdownFiles = require.context('/content/blogPosts', false, /\.md$/).keys().map((relativePath) => relativePath.substring(2))

    return Promise.all(
        markdownFiles.map(async (path) => {
            const markdown = await import(`/content/blogPosts/${path}`)
            return { ...markdown, slug: path.substring(0, path.length - 3) }
        })
    )
}

export default function Index ({ postsList }) {
    // Sort in reverse chronological order.
    const posts = postsList.sort((a, b) => (
        a.attributes.date < b.attributes.date ? 1 : a.attributes.date > b.attributes.date ? -1 : 0
    ))

    return (
    <Layout>
        <Head>
            <title>Thirtyacre Fibers</title>
        </Head>
        <Container>
            <div className="flex flex-col justify-center items-center mb-6">
                <img src="/img/logo.png" width="806px" height="269px" alt="Thirtyacre Fibers" />
                <p>Fiber artist. Software developer. Cat lover. General nerd.</p>
            </div>
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                    { posts.map((post) => (
                        <PostPreview
                            title={post.attributes.title}
                            coverImage={post.attributes.coverImage}
                            date={post.attributes.date}
                            slug={post.slug}
                        />
                    ))}
                </div>
            </section>
        </Container>
    </Layout>
    )
}

export async function getStaticProps() {
    const postsList = await importBlogPosts();

    return {
        props: {
            postsList,
        },
    }
}
