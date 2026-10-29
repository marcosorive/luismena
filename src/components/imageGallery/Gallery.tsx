import { useState } from "react";
import FsLightboxImport from "fslightbox-react";
import type { Image } from "../../Entities";
import { ImageGallery } from "./imageGallery";

const FsLightbox = (FsLightboxImport as { default?: typeof FsLightboxImport }).default ?? FsLightboxImport;

interface GalleryProps {
    images: Array<Image>;
}

export function Gallery({ images }: GalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const toggleLightbox = (index: number): void => {
        setSelectedImageIndex(index);
        setIsOpen((open) => !open);
    };

    const sources = images.map((image) => image.url);
    const customAttributes = images.map((image) => ({ alt: image.name }));

    return (
        <>
            <FsLightbox
                toggler={isOpen}
                sources={sources}
                customAttributes={customAttributes}
                sourceIndex={selectedImageIndex}
            />
            <ImageGallery images={images} onClickImage={toggleLightbox} />
        </>
    );
}
