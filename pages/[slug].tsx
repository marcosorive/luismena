import { useState, MouseEventHandler } from "react";
import type { NextPage } from 'next'
import { Layout } from "../components/layout";
import { GetStaticProps, GetStaticPaths } from 'next'
import { ImageGallery } from "../components/photoGallery";
import FsLightbox from 'fslightbox-react';
import { API_PATHS, FIXED_LINKS } from "../constants";
import { Page } from "../Entities";
import { fetchAPI } from "../utils/api";
import { specialComponenBuilder } from "../utils/utils";

import pageStyles from "../styles/page.module.scss";

const GenericPage: NextPage = (props: any) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const toggleLightbox = (_setSelectedImageIndex: number): void => {
        setSelectedImageIndex(_setSelectedImageIndex);
        console.log(`Should open ${_setSelectedImageIndex}`)
        setIsOpen(!isOpen)
    }

    const { pages, slug } = props;
    const navLinks = FIXED_LINKS.concat(pages.map((p: any) => ({ text: p.Titulo, link: `/${p.slug}` })));
    const currentPage: Page = pages.find((p: Page) => p.slug === slug);
    const currentPageImagesSources: Array<String> = currentPage.Imagenes.map(img => img.url);
    const currentPageImagesAlts: Array<Object> = currentPage.Imagenes.map(img => ({ alt: img.name }));
    const specialComponent: JSX.Element = specialComponenBuilder(currentPage.slug);


    return (
        <Layout links={navLinks} >
            <main className={pageStyles["page__main"]}>
                <section className={pageStyles["page__section-wrapper"]}>
                    <header className={pageStyles["page__title-text"]}>{currentPage.Titulo}</header>
                </section>
                <section className={pageStyles["page__section-wrapper"]}>

                    <FsLightbox
                        toggler={isOpen}
                        sources={currentPageImagesSources}
                        customAttributes={currentPageImagesAlts}
                        sourceIndex={selectedImageIndex}
                    />

                    <section className={pageStyles["page__section-wrapper"]}>
                        {specialComponent}
                        <p className={pageStyles["page__description"]}>{currentPage.Descripcion}</p>
                        <ImageGallery images={currentPage.Imagenes} onClickImage={toggleLightbox} />
                    </section>

                </section>
            </main>
        </Layout>
    )
};

export const getStaticProps: GetStaticProps = async (props: any) => {
    const pages = await fetchAPI(API_PATHS.pages);
    return {
        props: { pages, slug: props.params.slug }
    }
}


export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await fetchAPI<Array<Page>>(API_PATHS.pages);
    const paths = pages.map((p: Page) => ({ params: { slug: p.slug } }))
    return {
        paths: paths,
        fallback: false
    };
}

export default GenericPage;