import OtherImage from '/components/other-image'

export default function AlternateImages({ images }) {
    return (
        <div className="flex flex-row justify-start content-start h-auto min-h-fit">
            {images.map((image) =>
                <OtherImage
                    title={image.alt}
                    src={image.src}
                    alt={image.alt}
                    height={417}
                    width={556}
                />
            )}
        </div>
    )
}
