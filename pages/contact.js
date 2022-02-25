import Container from '/components/container'
import Layout from '/components/layout'
import ContactForm from '/components/contact-form'
import Head from 'next/head'

export default function Contact() {
    return (
        <>
            <Layout>
                <Head>
                    <title>Contact Thirtyacre Fibers</title>
                </Head>
                <Container>
                    <h3 className="mb-8 text-2xl font-bold tracking-tighter leading-tight">Contact Thirtyacre Fibers</h3>
                    <p className="mb-4 text-xl">I&apos;m happy to answer questions and I welcome constructive feedback! Please complete the form below to contact me.</p>
                    <ContactForm />
                </Container>
            </Layout>
        </>
    )
}