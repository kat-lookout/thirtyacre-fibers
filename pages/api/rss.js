import moment from 'moment';

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
        const pubDate = moment.utc(item.attributes.date).format('ddd, DD MMM YYYY HH:mm:ss')

        return `
        <item>
            <title>${item.attributes.title}</title>
            <author>Kat Wenger</author>
            <link>https://www.thirtyacrefibers.com/blog/post/${item.slug}</link>
            <guid>https://www.thirtyacrefibers.com/blog/post/${item.slug}</guid>
            <pubDate>${pubDate} GMT</pubDate>
            <description>![CDATA[ ${item.default.html} ]]</description>
        </item>`;
    }).join("")
    const feed = `<?xml version="1.0"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>Thirtyacre Fibers</title>
            <atom:link href="https://www.thiryacrefibers.com/api/rss.js" rel="self" type="application/rss+xml" />
            <link>https://www.thirtyacrefibers.com</link>
            <description>Fiber artist. Software developer. Cat lover. General nerd.</description>
            <image>https://www.thirtyacrefibers.com/imag/smallLogo.png</image>
            ${feedItems}
        </channel>
    </rss>`
    res.status(200).send(feed);
}
