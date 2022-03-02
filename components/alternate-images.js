import OtherImage from '/components/other-image'

export default function AlternateImages({ title, images }) {
    return (
        <div className="flex flex-row justify-start content-start h-auto min-h-fit">
            {images.map((image) =>
                <OtherImage
                    title={title}
                    src={image}
                    height={417}
                    width={556}
                />
            )}
        </div>
    )
}
