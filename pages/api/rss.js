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
        const content = item.default.html.replace(/<(\s*(img|br)[^>]*)>/g, "<$1 />")

        return `
        <entry>
            <id>https://www.thirtyacrefibers.com/blog/post/${item.slug}</id>
            <title>${item.attributes.title}</title>
            <updated>${item.attributes.date}</updated>
            <author>
                <name>Kat Wenger</name>
            </author>
            <content type="xhtml">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    ${content}
                </div>
            </content>
            <link rel="alternate" href="https://www.thirtyacrefibers.com/blog/post/${item.slug}" />
        </entry>`;
    }).join("")

    const feed = `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
        <id>https://www.thirtyacrefibers.com/</id>
        <title type="text">Thirtyacre Fibers</title>
        <updated>${new Date().toISOString()}</updated>
        <author>
            <name>Kat Wenger</name>
            <email>thirtyacrefibers@gmail.com</email>
            <uri>https://www.thirtyacrefibers.com/about</uri>
        </author>
        <link href="https://www.thirtyacrefibers.com/api/rss" rel="self" type="application/atom+xml" />
        <icon>https://www.thirtyacrefibers.com/imag/smallLogo.png</icon>
        <subtitle type="text">Fiber artist. Software developer. Cat lover. General nerd.</subtitle>
        ${feedItems}
    </feed>`
    res.status(200).send(feed);
}
