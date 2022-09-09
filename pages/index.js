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

const Index = ({ postsList }) => (
    <Layout>
        <Head>
            <title>Thirtyacre Fibers</title>
        </Head>
        <Container>
            <div className="flex flex-col justify-center items-center mb-6">
                <img src="/img/logo.png" width="806px" height="269px" alt="Thirtyacre Fibers" />
                <p>Fiber artist. Software developer. Cat lover. General nerd.</p>
            </div>
            {postsList.map((post) => (
                <PostPreview
                    title={post.attributes.title}
                    coverImage={post.attributes.coverImage}
                    date={post.attributes.date}
                    slug={post.slug}
                />
            ))}
        </Container>
    </Layout>
)

export async function getStaticProps() {
    const postsList = await importBlogPosts();

    return {
        props: {
            postsList,
        },
    }
}

export default Index;
