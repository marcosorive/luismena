import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { API_PATHS } from "../../../constants";
import { fetchAPI } from "../../../utils/api";


import contactStyles from "../contact.module.scss";
import pageStyles from "../../../styles/page.module.scss";


const ContactSuccess: NextPage = (props: any) => {

    return (
        <main className={pageStyles["page__main"]}>
            <section className={pageStyles["page__section-wrapper"]}>
                <header className={pageStyles["page__title-text"]}>Contacto</header>
            </section>
            <section>
                <p className={contactStyles["page__title-text--small"]}>Muchas gracias por tu mensaje, ha sido enviado correctamente. Me pondre en contacto contigo lo antes posible.</p>
            </section>
        </main>
    )
}

export function getServerSideProps() {
    return {
    };
}


export const getStaticProps: GetStaticProps = async () => {
    const pages = await fetchAPI(API_PATHS.pages);
    return {
        props: { pages }
    }
}


export default ContactSuccess
