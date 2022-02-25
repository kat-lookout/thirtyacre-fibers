import DateFormatter from '/components/date-formatter'
import CoverImage from '/components/cover-image'
import Link from 'next/link'

export default function ProjectPreview({
    title,
    coverImage,
    startDate,
    updateDate,
    slug
}) {
    return (
        <div>
            <div className="mb-5">
                <CoverImage
                    slug={slug}
                    title={title}
                    src={coverImage}
                    height={417}
                    width={556}
                />
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
                <Link as={`/projects/${slug}`} href="/projects/[slug]">
                    <a className="text-denim hover:underline">{title}</a>
                </Link>
            </h3>
            <div className="text-lg mb-4">
                Started: <DateFormatter dateString={startDate} /><br />
                Last Update: <DateFormatter dateString={updateDate} />
            </div>
        </div>
    )
}