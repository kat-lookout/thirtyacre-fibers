async function importBlogPosts () {
    const markdownFiles = require.context('/content/blogPosts', false, /\.md$/).keys().map((relativePath) => relativePath.substring(2))

    return Promise.all(
        markdownFiles.map(async (path) => {
            const markdown = await import(`/content/blogPosts/${path}`)
            return { ...markdown, slug: path.substring(0, path.length - 3) }
        })
    )
}

export default async function handler(req, res) {
    const posts = await importBlogPosts()

    // Reverse chronological order
    posts.sort((a, b) => {
        return a.attributes.date < b.attributes.date ? 1 : a.attributes.date > b.attributes.date ? -1 : 0;
    })

    const feedItems = posts.map((item) => {
        const html = item.default.html.replace(/<(\s*(img|br)[^>]*)>/g, "<$1 />")

        return { slug: item.slug, title: item.attributes.title, date: item.attributes.date, content: html }
    })
    res.status(200).json(feedItems);
}
