import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { Hyperlink } from "../../Entities";

import styles from './Navbar.module.scss'

interface NavbarProps {
    links: Hyperlink[]
}

export function Navbar({
    links
}: NavbarProps) {

    const [isMenuClosed, setMenuClosed] = useState(true);

    const router = useRouter();
    const currentPath = router.asPath;
    return (
        <nav className={styles["nav-container"]}>
            <div className={styles["nav-hamburguer-icon"]} onClick={() => setMenuClosed(!isMenuClosed)}>☰</div>
            <div className={styles["nav-links"]}>
                {links.map((node) => {
                    const linkClassName = node.link === currentPath ? 'active-link' : ''
                    return (<Link key={node.text} href={node.link} ><a className={styles[linkClassName]}>{node.text}</a></Link>);
                })}
            </div>
            <div className={styles[`overlay-container${isMenuClosed ? "-hidden" : "-show"}`]}>
                <div>
                    <div className={styles["overlay-buttonClose"]} onClick={() => setMenuClosed(!isMenuClosed)}><span>&times;</span></div>
                    <div className={styles["overlay-menu-wrapper"]}>
                        <div className={styles["overlay-menu"]}>
                            {links.map((node) => {
                                const linkClassName = node.link === currentPath ? `${styles["overlay-menu-item"]} ${styles["overlay-active-link"]}` : `${styles["overlay-menu-item"]}`
                                return (<Link key={node.text} href={node.link}>
                                    <a onClick={() => setMenuClosed(!isMenuClosed)} className={linkClassName}>
                                        {node.text}
                                    </a>
                                </Link>);
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

Navbar.defaultProps = {
    backgroundColor: 'black',
    fontColor: 'white',
    brand: 'Navbar',
    links: [
        { text: "Home", link: "/" },
        { text: "Portfolio", link: "/portfolio" },
        { text: "Blog", link: "/blog" }
    ]
}

