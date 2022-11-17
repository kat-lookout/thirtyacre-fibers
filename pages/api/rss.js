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
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const months   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const pubDate  = new Date(item.attributes.date)

        return `
        <item>
            <title>${item.attributes.title}</title>
            <author>thirtyacrefibers@gmail.com (Kat Wenger)</author>
            <link>https://www.thirtyacrefibers.com/blog/post/${item.slug}</link>
            <guid>https://www.thirtyacrefibers.com/blog/post/${item.slug}</guid>
            <pubDate>${weekdays[pubDate.getUTCDay()]}, ${pubDate.getUTCDate().toString().padStart(2, '0')} ${months[pubDate.getUTCMonth()]} ${pubDate.getUTCFullYear()} ${pubDate.getUTCHours().toString().padStart(2, '0')}:${pubDate.getUTCMinutes().toString().padStart(2, '0')}:${pubDate.getUTCSeconds().toString().padStart(2, '0')} GMT</pubDate>
            <description><![CDATA[ ${item.default.html} ]]></description>

        </item>`;
    }).join("")
    const feed = `<?xml version="1.0"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>Thirtyacre Fibers</title>
            <atom:link href="https://www.thirtyacrefibers.com/api/rss" rel="self" type="application/rss+xml" />
            <link>https://www.thirtyacrefibers.com</link>
            <description>Fiber artist. Software developer. Cat lover. General nerd.</description>
            <image>
                <url>https://www.thirtyacrefibers.com/imag/smallLogo.png</url>
                <title>Thirtyacre Fibers</title>
                <link>https://www.thirtyacrefibers.com</link>
            </image>
            ${feedItems}
        </channel>
    </rss>`
    res.status(200).send(feed);
}
