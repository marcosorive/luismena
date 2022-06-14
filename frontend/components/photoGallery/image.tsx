import { Image } from "../../Entities";
import styles from "./photogallery.module.scss";

interface ImageProps {
    image: Image
    className?: string
}
export function ImageComponent({ image, className }: ImageProps) {
    const imageClassName = className || styles["image--image"];
    return (
        <img alt={image.name}
            className={imageClassName}
            src={image.formats.small.url}
        />
    )
    // return (<img alt="testing"
    //     className={imageClassName}
    //     srcSet={`${image.formats.small.url} ${image.formats.small.width}w,
    //     ${image.formats.medium.url} ${image.formats.medium.width}w,
    //     ${image.formats.large.url} ${image.formats.large.width}w
    //     `}
    //     sizes={`(max-width: 678px) 400px,
    //     (max-width: 1150px) 1000px,
    //     (max-width: 1600px) 1200px,
    //     `}
    //     src={image.formats.medium.url} />)
}