import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { ImageGallery, imageGalleryTestIds } from "./imageGallery";
import { Image } from "../../Entities";

describe('ImageGallery ', () => {
    const baseImage: Image = {
        id: 1,
        name: "test-image",
        width: 100,
        height: 100,
        url: 'https://estudioluismena.com/image.png',
        formats: {
            thumbnail: { url: '' },
            large: { url: '' },
            medium: { url: '' },
            small: { url: '' }
        }
    }
    const baseImages = [
        { ...baseImage },
        {
            ...baseImage,
            id: 2,
            name: "test-image2",
            url: 'https://estudioluismena.com/image2.png',
        }
    ]
    it('should have corresponding classNames', () => {
        render(<ImageGallery images={baseImages} onClickImage={() => { }} />);

        expect(screen.getByTestId(imageGalleryTestIds.wrapper)).toHaveClass('gallery--wrapper')
        expect(screen.getByTestId(imageGalleryTestIds.grid)).toHaveClass('gallery--grid')
        baseImages.forEach(image => {
            expect(screen.getByTestId(`${imageGalleryTestIds.singleImage}${image.id}`)).toHaveClass('image--wrapper')
        })
    });

    it('should call the click function with the expected parameter', async () => {
        const onClickSpy = jest.fn();

        render(<ImageGallery images={baseImages} onClickImage={onClickSpy} />);

        for (const image of baseImages) {
            await userEvent.click(screen.getByTestId(`${imageGalleryTestIds.singleImage}${image.id}`));
        };
        expect(onClickSpy).toBeCalledTimes(2);
        expect(onClickSpy).toHaveBeenNthCalledWith(1, 0);
        expect(onClickSpy).toHaveBeenNthCalledWith(2, 1);
    });
});