import DateFormatter from '/components/date-formatter'
import CoverImage from '/components/cover-image'
import Link from 'next/link'

export default function PostPreview({
    title,
    coverImage,
    date,
    slug
}) {
    return (
        <div>
            <div className="mb-5">
                <CoverImage
                    slug={slug}
                    src={coverImage}
                    height={417}
                    width={556}
                />
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
                <Link as={`/blog/post/${slug}`} href="/blog/post/[slug]">
                    <a className="text-denim hover:underline">{title}</a>
                </Link>
            </h3>
            <div className="text-lg mb-4">
                <label>Post Date: </label>
                <DateFormatter dateString={date} />
            </div>
        </div>
    )
}