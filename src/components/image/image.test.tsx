import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImageComponent } from "./image";
import type { Image } from "../../Entities";

describe("Image", () => {
    const baseImage: Image = {
        id: 1,
        name: "test-image",
        width: 100,
        height: 100,
        url: "https://estudioluismena.com/image.png",
        formats: {
            thumbnail: { url: "" },
            large: { url: "" },
            medium: { url: "" },
            small: { url: "" },
        },
    };

    it("should use the default properties", () => {
        render(<ImageComponent image={baseImage} />);

        expect(screen.getByAltText("test-image")).toBeTruthy();
        expect(screen.getByAltText("test-image")).toHaveAttribute(
            "src",
            "https://estudioluismena.com/image.png",
        );
        expect(screen.getByAltText("test-image")).toHaveAttribute("loading", "lazy");
    });

    it.each([
        { width: 100, height: 200, classNamePassed: "", expectedClassName: "image--image__vertical" },
        { width: 200, height: 100, classNamePassed: "", expectedClassName: "image--image" },
        { width: 100, height: 100, classNamePassed: "", expectedClassName: "image--image__vertical" },
        { width: 500, height: 1200, classNamePassed: "special-class", expectedClassName: "special-class" },
    ])("should have the correct className", ({ width, height, classNamePassed, expectedClassName }) => {
        const newImage = { ...baseImage, width, height };

        render(<ImageComponent image={newImage} className={classNamePassed} />);

        expect(screen.getByAltText("test-image").className).toBe(expectedClassName);
    });

    it.each([
        { size: "thumbnail" as const, url: "https://go.com/thumb.jpg" },
        { size: "small" as const, url: "https://go.com/small.png" },
        { size: "medium" as const, url: "https://go.com/medium.gif" },
        { size: "large" as const, url: "https://go.com/large.webp" },
    ])("should load the image when the size is $size", ({ size, url }) => {
        const newImage = {
            ...baseImage,
            formats: {
                ...baseImage.formats,
                [size]: { url },
            },
        };

        render(<ImageComponent image={newImage} size={size} />);

        expect(screen.getByAltText("test-image")).toHaveAttribute("src", url);
    });
});
