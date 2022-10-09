import { Image } from "../../Entities";
import styles from "./image.module.scss";

interface ImageProps {
    image: Image
    className?: string
    size?: "thumbnail" | "small" | "medium" | "large"
}
export function ImageComponent({ image, className, size }: ImageProps) {
    const isImageHorizontal = image.width > image.height;
    const bestFitImageClassName = isImageHorizontal ? styles["image--image"] : styles["image--image__vertical"]
    const imageClassName = className || bestFitImageClassName;
    const imageSource = size ? image.formats[size].url : image.url;

    return (
        <img alt={image.name}
            className={imageClassName}
            src={imageSource}
            loading="lazy"
        />
    )
}