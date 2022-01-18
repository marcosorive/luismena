import type { NextPage } from 'next'
import { Navbar } from "../components/navbar";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { API_PATHS, FIXED_LINKS } from "../constants";
import { fetchAPI } from "../utils/api";
import { Page } from "../Entities";

const GenericPage: NextPage = (props: any) => {
    const { pages, slug } = props;
    const navLinks = FIXED_LINKS.concat(pages.map((p: any) => ({ text: p.Titulo, link: `/${p.slug}` })));
    const currentPage = pages.filter((p: Page) => p.slug === slug);
    return (
        <div>
            <Navbar links={navLinks} />
            <main>
                <h1>{slug}</h1>
            </main>
        </div>
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