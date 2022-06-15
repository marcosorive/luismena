import { Image } from "../../Entities";
import styles from "./photogallery.module.scss";

interface ImageProps {
    image: Image
    className?: string
}
export function ImageComponent({ image, className }: ImageProps) {
    const isImageHorizontal = image.width > image.height;
    const bestFitImageClassName = isImageHorizontal ? styles["image--image"] : styles["image--image__vertical"]
    const imageClassName = className || bestFitImageClassName;

    return (
        <img alt={image.name}
            className={imageClassName}
            src={image.url}
            loading="lazy"
        />
    )
}