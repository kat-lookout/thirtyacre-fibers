import Head from 'next/head'

export default function Meta() {
    return (
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
            <link rel="manifest" href="/favicons/site.webmanifest" />
            <link rel="shortcut icon" href="/favicons/favicon.icon" />
            <link rel="alternate" type="application/rss+xml" href="https://www.thirtyacrefibers.com/.netlify/functions/rss" />
            <meta name="description" content="Thirtyacre Fibers" />
            <title>Thirtyacre Fibers</title>
            <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
    )
}
