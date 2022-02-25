import Header from '/components/header'
import Footer from '/components/footer'
import Meta from '/components/meta'

export default function Layout ({ children }) {
    return (
        <>
            <Meta />
            <Header />
            <div className="min-h-min py-4">
                <main>{children}</main>
            </div>
            <Footer />
        </>
    )
}
