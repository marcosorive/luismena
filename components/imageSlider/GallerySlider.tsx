import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Image } from "../../Entities";
import { ImageComponent } from "../photoGallery/image";
import styles from "./GallerySlider.module.scss"


interface GallerySliderProps {
    images: Array<Image>
    onClose: any
    selectedImage: number
}

export const GallerySlider = ({ images, onClose, selectedImage }: GallerySliderProps) => {

    const getImageContaier = (image: Image) => {
        const imageClassname = image.width >= image.height ? styles["image__horizontal"] : styles["image__vertical"]
        return (<div className={styles["image__container"]}>
            <ImageComponent image={image} className={imageClassname} />
        </div>)
    }

    const allImages = images.map((_image) => {
        return getImageContaier(_image);
    })


    return (<div className={styles["gallery-wrapper"]}>
        <div className={styles["close-button"]} onClick={onClose}>&times;</div>
        <AwesomeSlider
            className={styles["slider"]}
            fillParent={true}
            bullets={false}
            selected={selectedImage}
        >
            {allImages}
        </AwesomeSlider>
    </div>)
}