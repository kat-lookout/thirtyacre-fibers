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
    try {
        console.log('Ding!');
        const posts = await importBlogPosts()
        console.log('Dong!');
        const feedItems = posts.map((item) => {
            return `
            <item>
                <title>${item.attribute.title}</title>
                <author>Kat Wenger</author>
                <link>https://www.thirtyacrefibers.com/blog/post/${item.slug}</link>
                <guid>https://www.thirtyacrefibers.com/blog/post/${item.slug}</guid>
                <pubDate>${item.attributes.date}</pubDate>
            </item>`;
        }).join("")
        const feed = `
        <?xml version="1.0"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>Thirtyacre Fibers</title>
                <atom:link href="https://www.thiryacrefibers.com/api/rss.js" rel="self" type="application/rss+xml" />
                <link>https://www.thirtyacrefibers.com</link>
                <description>Fiber artits. Software developer. Cat lover. General nerd.</description>
                ${feedItems}
            </channel>
        </rss>`
        res.status(200).send(feed);
    }
    catch (err) {
        res.status(500).send({ error : 'Unable to load feed.' });
    }
}
