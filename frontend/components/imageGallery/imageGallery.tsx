
import { Image } from "../../Entities";
import { ImageComponent } from "../image";

import styles from "./photogallery.module.scss";

interface ImageGalleryProps {
    images: Array<Image>,
    onClickImage: any
}

export const imageGalleryTestIds = {
    wrapper: "image-gallery-wrapper",
    grid: "image-gallery-grid",
    singleImage: "image-gallery-single-image",
}

export function ImageGallery({ images, onClickImage }: ImageGalleryProps) {

    const galleryImages = images.map((image: Image, index) => {
        return (<div key={image.id} className={styles["image--wrapper"]} onClick={() => onClickImage(index)} data-testid={`${imageGalleryTestIds.singleImage}${image.id}`}>
            <ImageComponent image={image} size='small' />
        </div>)
    });

    return (<div className={styles["gallery--wrapper"]} data-testid={imageGalleryTestIds.wrapper}>
        <div className={styles["gallery--grid"]} data-testid={imageGalleryTestIds.grid}>
            {galleryImages}
        </div>

    </div>)


}