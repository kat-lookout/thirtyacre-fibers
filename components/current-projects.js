import ProjectPreview from '/components/project-preview'

export default function CurrentProjects({ projects }) {
    return (
        <section>
            <h2 className="mb-8 text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-center">

                On The Needles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                { projects.map((project) => (
                    <ProjectPreview
                        key={project.slug}
                        title={project.name}
                        coverImage={project.coverImage}
                        startDate={project.startDate}
                        updateDate={project.updateDate}
                        slug={project.slug}
                    />
                ))}
            </div>
        </section>
    )
}
