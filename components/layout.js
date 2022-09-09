import Header from '/components/header'
import Footer from '/components/footer'
import Meta from '/components/meta'
import Script from 'next/script'

export default function Layout ({ children }) {
    return (
        <>
            <Meta />
            <Header />
            <div className="min-h-min py-4">
                <main>{children}</main>
            </div>
            <Script strategy="afterInteractive" src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js" onLoad={() => {
                kofiWidgetOverlay.draw('thirtyacrefibers', {
                    'type': 'floating-chat',
                    'floating-chat.donateButton.text': 'Support me',
                    'floating-chat.donateButton.background-color': '#151B8D',
                    'floating-chat.donateButton.text-color': '#FEFCFF'
                })
            }} />
            <Script strategy="beforeInteractive" onReady={() => {
                if (window.netlifyIdentity) {
                    window.netlifyIdentity.on("init", user => {
                        if (!user) {
                            window.netlifyIdentity.on("login", () => {
                                document.location.href = "/admin/"
                            });
                        }
                    });
                }
            }}
            <Footer />
        </>
    )
}

