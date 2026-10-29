import type { Image, SliderImage } from "../Entities";

export function imagesToSliderImages(images: Array<Image>): Array<SliderImage> {
    return images.map((img: Image) => ({ source: img.url, alt: img.name }));
}
