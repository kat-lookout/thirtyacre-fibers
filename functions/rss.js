const https = require("https")
const fs = require("node:fs/promises")
const path = require("path");

const importBlogPosts = async () =>  {
    const postDir = path.join(process.cwd(), 'content/blogPosts');
    const markdownFiles = await fs.readdir(postDir);

    return Promise.all(
        markdownFiles.map(async (filename) => {
            const markdown = await import(`${postDir}/${filename}`)
            return { ...markdown, slug: filename.substring(0, filename.length - 3) }
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
    const rssFeed = `<?xml version="1.0"?>
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
