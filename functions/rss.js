const https  = require("https")
const nfetch = require("node-fetch")

async function getPosts () {
    const posts = await nfetch.fetch('https://www.thirtyacrefibers.com/api/rss');

    return posts.json();
}

function buildEntries (posts) {
    return posts.map((post) => {
        return `
    <entry>
        <id>https://www.thirtyacrefibers.com/blog/post/${post.slug}</id>
        <title>${post.title}</title>
        <updated>${post.date}</updated>
        <author><name>Kat Wenger</name></author>
        <content type="xhtml">
            <div xmlns="http://www.w3.org/1999/xhtml">
                ${post.content}
            </div>
        </content>
        <link rel="alternate" href="http://www.thirtyacrefibers.com/blog/post/${post.slug}" />
    </entry>
        `;
    }).join("");
}

exports.handler = async function (event, context) {
    const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed version=xmlns="http://www.w3.org/2005/Atom">
    <id>https://www.thirtyacrefibers.com/</id>
    <title type="text">Thirtyacre Fibers</title>
    <updated>${new Date().toISOString()}</updated>
    <author>
        <name>Kat Wenger</name>
        <email>thirtyacrefibers@gmail.com</email>
        <uri>https://www.thirtyacrefibers.com/about</uri>
    </author>
    <link href="https://www.thirtyacrefibers/.netlify/functions/rss" rel="self" type="application/atom+xml" />
    <icon>https://www.thirtyacrefibers.com/img/smallLogo.png</icon>
    <subtitle type="text">Fiber artist. Software developer. Cat lover. General nerd.</subtitle>
    ${buildEntries(await getPosts())}
</feed>`;

    return {
        statusCode: 200,
        contextType: "application/atom+xml",
        body: feed,
    };
};
