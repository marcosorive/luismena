import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
    it("should render the text passed", () => {
        const text = "hello world";

        render(<Button text={text} />);

        expect(screen.getByText(text)).toBeTruthy();
    });

    it("should call the passed onclick function", async () => {
        const text = "buy";
        const onClickSpy = vi.fn();

        render(<Button text={text} buttonOnClick={onClickSpy} />);
        await userEvent.click(screen.getByText(text));

        expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
});
