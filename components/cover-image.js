import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import styles from '/components/image-styles.module.css'

export default function CoverImage({ title, src, slug, height, width, priority=false }) {
    const image = (
        <Image
          src={src}
          alt={`Cover Image for ${title}`}
          className={cn('shadow-sm', {
              'hover:shadow-md transition-shadow duration-200': slug,
          })}
          layout="responsive"
          width={width}
          height={height}
          className={styles.overlap}
          priority={priority}
        />
    )
    return (
        <div className="sm:mx-0">
            { slug ? (
                <Link as={`/projects/${slug}`} href="/projects/[slug]">
                    <a aria-label={title}>{image}</a>
                </Link>
            ) : (
                image
            )}
        </div>
    )
}