import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { API_PATHS } from "../constants";
import { fetchAPI } from "../utils/api";
import Link from "next/link";
import pageStyles from "../styles/page.module.scss";

const Home: NextPage = (props: any) => {
    return (<main className={pageStyles["page__main"]}><h1>Ups... parece que ha ocurrido un error</h1>
        <h3>Prueba a volver a <Link href="/"><a>la pagina principal</a></Link></h3>
    </main>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const pages = await fetchAPI(API_PATHS.pages);
    const homePage = await fetchAPI(API_PATHS.homePage);
    return {
        props: { pages, homePage }
    }
}

export default Home
