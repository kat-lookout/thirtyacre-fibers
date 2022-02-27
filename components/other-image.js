import Image from 'next/image'
import styles from '/components/image-styles.module.css'

export default function OtherImage({ title, src, height, width }) {    
    return (
        <div className="w-1/3">
            <Image src={src} alt={`Alternate view of ${title}`} layout="responsive" height={height} width={width} className={styles.overlap} />
        </div>
    )
}