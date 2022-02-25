import Container from '/components/container'

export default function Footer() {
    return (
        <Container>
            <footer className="bg-milk border-t-2 border-gray-400 h-20">        
                <div className="flex justify-center content-center pt-4">
                    <p>Built with <a className="text-denim no-underline hover:underline" href="https://nextjs.org/">Next.js</a> and deployed with <a className="text-denim no-underline hover:underline" href="https://www.netlify.com">Netlify</a></p>
                </div>
            </footer>
        </Container>
    )
}