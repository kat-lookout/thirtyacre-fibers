import Container from '/components/container'
import Layout from '/components/layout'

export default function ContactSuccess() {
    return (
        <>
            <Layout>
                <Container>
                    <h3 className="mb-8 text-2xl font-bold tracking-tighter leading-tight">Thank You!</h3>
                    <p className="mb-4 text-xl">Thank you for your feedback! Your message has been sent and will be responded to as soon as possible.</p>
                </Container>
            </Layout>
        </>
    )
}