
import { MouseEventHandler } from "react";

import styles from './button.module.scss'

interface ButtonProps {
    text: string
    buttonOnClick?: MouseEventHandler
}

export function Button({ text, buttonOnClick }: ButtonProps) {

    return (
        <button className={styles["button"]} onClick={buttonOnClick}>{text}</button>
    )
}