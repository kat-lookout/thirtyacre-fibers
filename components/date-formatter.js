export default function DateFormatter({ dateString }) {
    // This isn't the best way to do this, because I'm assuming locale.
    // But for my purposes, it's enough.
    const date = new Date(dateString)
    let formatter = new Intl.DateTimeFormat('en', { dateStyle: 'long' })

    return <time dateTime={dateString}>{formatter.format(date)}</time>
}
