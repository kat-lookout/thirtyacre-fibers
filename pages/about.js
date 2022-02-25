import Layout from '/components/layout'
import Container from '/components/container'
import Head from 'next/head'

export default function About() {
    return (
        <>
            <Head>
                <title>About</title>
            </Head>
            <Layout>
                <Container className="w-2/3">
                    <div className="flex flex-row flex-nowrap items-center mb-3">
                        <img src="/img/kat.jpg" width="328px" height="auto" className="rounded-full mr-4" alt="A person of indeterminate gender wearing brown glasses and knitted fingerless glove in shades of green, black, red, and white rests their chin in their hands and smiles at the camera." />
                        <p>Hey, y&apos;all! My name is Kat, and my pronouns are they/them. I am a non-binary knitter, software developer, and general nerd.<br />
                           <br />
                           I love the satisfaction of creating something that is both useful and beautiful, and I am blessed to be able to do so both with yarn and with code.</p>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-end items-center">
                        <p>My online presence, Thirtyacre Fibers, is named in memory of my maternal great-grandmother, Elizabeth Jenny (nee&#769; Thirtyacre - pictured to the right), and all the lovely fiber and textile artists in my family.</p>
                        <img src="/img/ethirtyacre.jpg" width="359px" height="auto" className="rounded-full ml-4" alt="An older woman in a pink robe sits in front of a fence sewing." />
                    </div>
                </Container>
            </Layout>
        </>
    )
}
