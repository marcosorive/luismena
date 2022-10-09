import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { ImageComponent } from "./image";
import { Image } from "../../Entities";

describe('Image', () => {
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

    it("should use the default properties", () => {
        render(<ImageComponent image={baseImage} />)

        expect(screen.getByAltText('test-image')).toBeTruthy();
        expect(screen.getByAltText('test-image')).toHaveAttribute('src', 'https://estudioluismena.com/image.png')
        expect(screen.getByAltText('test-image')).toHaveAttribute('loading', 'lazy')
    })

    it.each`
        width | height | classNamePassed | expectedClassName | desc
        ${100} | ${200} |${""} |${"image--image__vertical"} |${"if the image is vertical"} 
        ${200} | ${100} |${""} |${"image--image"} |${"if the image is horizontal"} 
        ${100} | ${100} |${""} |${"image--image__vertical"} |${"if the image is squared"} 
        ${500} | ${1200} |${"special-class"} |${"special-class"} |${"if a specigic classname is passed"} 
    
    `('should have the correct className $desc', ({ width, height, classNamePassed, expectedClassName }) => {
        const newImage = {
            ...baseImage,
            width,
            height
        }

        render(<ImageComponent image={newImage} className={classNamePassed} />)

        expect(screen.getByAltText('test-image').className).toBe(expectedClassName);

    });

    it.each`
        size | url
        ${"thumbnail"} | ${"https://go.com/thumb.jpg"} 
        ${"small"} | ${"https://go.com/small.png"}
        ${"medium"} | ${"https://go.com/medium.gif"} 
        ${"large"} | ${"https://go.com/large.webp"}
    `("should load the image when the size is $desc", ({ size, url }) => {
        const newImage = {
            ...baseImage,
            formats: {
                ...baseImage.formats,
                [size]: { url }
            }
        }
        render(<ImageComponent image={newImage} size={size} />)

        expect(screen.getByAltText('test-image')).toHaveAttribute('src', url)
    })
})