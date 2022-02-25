export default function ContactForm() {
    return (
        <form className="grid grid-cols-1 gap-y=20" name="contact" method="POST" action="/contact-success" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />
            <label className="text-lg font-bold" htmlFor="contact-name">Name</label>
            <input className="border-2 hover:border-denim w-3/4 rounded mb-2" type="text" name="contact-name" id="contact-name" />
            <label className="text-lg font-bold" htmlFor="contact-email">Email</label>
            <input className="border-2 hover:border-denim w-3/4 rounded mb-2" type="text" name="contact-email" id="contact-email" />
            <label className="text-lg font-bold" htmlFor="contact-message">Message</label>
            <textarea className="border-2 hover:border-denim w-3/4 rounded mb-2" name="contact-message" id="contact-message"></textarea>
            <button className="bg-denim border-denim rounded text-milk w-32 h-8 font-bold" type="submit">Send</button>
        </form>
    )
}