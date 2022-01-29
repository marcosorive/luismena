
import { Image } from "../../Entities";
import { ImageComponent } from "./image";

import styles from "./photogallery.module.scss";

interface PhotoGalleryProps {
    images: Array<Image>,
    onClickImage: any
}

export function PhotoGallery({ images, onClickImage }: PhotoGalleryProps) {

    const galleryImages = images.map((image: Image, index) => {
        return (<div key={image.id} className={styles["image--wrapper"]} onClick={() => onClickImage(index)}>
            <ImageComponent image={image} />
        </div>)
    });

    return (<div className={styles["gallery--wrapper"]}>
        <div className={styles["gallery--grid"]}>
            {galleryImages}
        </div>

    </div>)


}