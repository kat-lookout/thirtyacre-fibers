import DateFormatter from '/components/date-formatter'
import CoverImage from '/components/cover-image'
import PostTitle from '/components/post-title'

export default function PostHeader({ title, coverImage, date }) {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage src={coverImage} height={930} width={1240} priority={true} />
            </div>
            <div className="w-full mx-auto italic text-left text-lg">
                Post Date: <DateFormatter dateString={date} />
            </div>
        </>
    )
}