import ProjectPreview from '/components/project-preview'

export default function FinishedObjects({ objects }) {
    return (
        <section>
            <h2 className="mb-8 text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-center">

                Recently Finished
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                { objects.map((object) => (
                    <ProjectPreview
                        key={object.slug}
                        title={object.name}
                        coverImageSrc={object.coverImage.src}
                        coverImageAlt={object.coverImage.alt}
                        startDate={object.startDate}
                        completeDate={object.completeDate}
                        slug={object.slug}
                    />
                ))}
            </div>
        </section>
    )
}
