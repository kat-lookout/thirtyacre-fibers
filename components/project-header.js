import DateFormatter from '/components/date-formatter'
import CoverImage from '/components/cover-image'
import ProjectTitle from '/components/project-title'

export default function ProjectHeader({ title, coverImageSrc, coverImageAlt, updateDate }) {
    return (
        <>
            <ProjectTitle>{title}</ProjectTitle>
            <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage src={coverImageSrc} alt={coverImageAlt} height={930} width={1240} priority={true} />
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6 text-lg">
                    Updated: <DateFormatter dateString={updateDate} />
                </div>
            </div>
        </>
    )
}
