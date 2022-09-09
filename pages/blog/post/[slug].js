import fs from 'fs'
import path from 'path'
import Layout from '/components/layout'
import Container from '/components/container'
import PostHeader from '/components/post-header'
import PostBody from '/components/post-body'

const Post = ({ blogpost }) => {
    if (!blogpost) return <div>not found</div>

    const { html, attributes } = blogpost

    return (
        <Layout>
            <Container>
                <article className="mb-32">
                    <PostHeader
                        title={attributes.title}
                        coverImage={attributes.coverImage}
                        date={attributes.date}
                    />
                    <PostBody
                        content={html}
                    />
                </article>
            </Container>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = fs.readdirSync(path.join(process.cwd(), 'content/blogPosts')).map((blogName) => {
        const trimmedName = blogName.substring(0, blogName.length - 3)
        return {
            params: { slug : trimmedName },
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const blogpost = await import(`/content/blogPosts/${slug}.md`).catch(() => null)

    return {
        props : {
            blogpost : blogpost.default,
        },
    }
}

export default Post

