import Container from '/components/container'

export default function Header() {
    return (
        <Container className="sticky top-0">
            <header className="border-b-2 border-b-gray-400 w-full h-20 flex justify-around content-center bg-milk z-99 p-3">
                <nav className="w-1/2 font-bold text-xl flex justify-start items-center" role="navigation" aria-label="main navigation">
                    <a className="mr-6" href="/"><img src="/img/smallLogo.png" alt="Thirtyacre Fibers" width="50px" height="50px" /></a>
                    <a className="mr-6 text-denim hover:underline" href="/about">About</a>
                    <a className="mr-6 text-denim hover:underline" href="/projects">Projects</a>
                </nav>
                <nav className="w-1/2 font-bold text-xl flex justify-end" role="navigation" aria-label="main navigation">
                    <a className="ml-6" href="https://thirtyacrefibers.etsy.com/"><img src="/img/etsy.png" alt="Etsy Shop" /></a>
                    <a className="ml-6" href="https://www.instagram.com/thirtyacrefibers/"><img src="/img/instagram.png" alt="Instagram" /></a>
                    <a className="ml-6" href="https://twitter.com/thirtyacrefiber"><img src="/img/twitter.png" alt="Twitter" /></a>
                </nav>
            </header>
        </Container>
    )
}
