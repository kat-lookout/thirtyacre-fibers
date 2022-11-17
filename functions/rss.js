const https = require("https")

const importBlogPosts = async () =>  {
    const markdownFiles = require.context('/content/blogPosts', false, '/\.md$/').keys().map((relativePath) => relativePath.substring(2))

    return Promise.all(
        markdownFiles.map(async (path) => {
            const markdown = await import(`/context/blogPosts/${path}`)
            return { ...markdown, slug: path.substring(, path.length - 3) }
        })
    )
}

function buildRssItems (items) {
    return items.map((item) => {
        return `
            <item>
                <title>${item.attributes.title}</title>
                <author>Kat Wenger</author>
                <link>https://www.thirtyacrefibers.com/blog/post/${item.slug}</link>
                <guid>https://www.thirtyacrefibers.com/blog/post/${item.slug}</guid>
                <pubDate>${item.attributes.date}</pubDate>
            </item>
        `;
    }).join("");
}

exports.handler = async function (event, context) {
    const rssFeed = `<?xml version="1.0">
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>Thirtyacre Fibers</title>
            <atom:link href="https://www.thirtyacrefibers.com/.netlify/functions/rss" rel="self" type="application/rss+xml" />
            <link>https://www.thirtyacrefibers.com</link>
            <description>Fiber artist. Software developer. Cat lover. General nerd.</description>
            ${buildRssItems(await importBlogPosts())}
        </channel>
    </rss>`;

    return {
        statusCode: 200,
        contextType: "text/xml",
        body: rssFeed,
    };
};
