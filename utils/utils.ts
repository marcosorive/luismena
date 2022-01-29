import { Image, SliderImage } from "../Entities";
export function ImagesToSliderImages(images: Array<Image>): Array<SliderImage> {
    return images.map((img: Image) => ({ source: img.url }));
}