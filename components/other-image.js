import Image from 'next/image'
import Link from 'next/link'
import styles from '/components/image-styles.module.css'

export default function OtherImage({ src, alt, height, width }) {
    return (
        <div className="w-1/3">
            <Link href={src}><a><Image src={src} alt={alt} layout="responsive" height={height} width={width} className={styles.overlap} /></a></Link>
        </div>
    )
}
