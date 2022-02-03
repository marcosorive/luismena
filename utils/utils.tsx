import { Image, SliderImage } from "../Entities";
import { pageToSpecialComponent } from "../constants";

export function imagesToSliderImages(images: Array<Image>): Array<SliderImage> {
    return images.map((img: Image) => ({ source: img.url }));
}


export function specialComponenBuilder(pageName: string): JSX.Element {
    const Component: JSX.Element = pageToSpecialComponent[pageName];
    return Component || <></ >
}

