import DateFormatter from '/components/date-formatter'
import CoverImage from '/components/cover-image'
import PostTitle from '/components/post-title'

export default function PostHeader({ title, coverImage, date }) {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            <div className="flex flex-row place-content-center mb-4">
                <CoverImage src={coverImage} height={480} width={640} priority={true} />
            </div>
            <div className="w-full mx-auto italic text-left text-lg">
                Post Date: <DateFormatter dateString={date} />
            </div>
        </>
    )
}