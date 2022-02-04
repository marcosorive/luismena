import type { NextPage } from 'next'
import { Navbar } from "../../../components/navbar";
import { GetStaticProps } from 'next'
import { API_PATHS, FIXED_LINKS } from "../../../constants";
import { fetchAPI } from "../../../utils/api";


import contactStyles from "../contact.module.scss";
import pageStyles from "../../../styles/page.module.scss";


const ContactSuccess: NextPage = (props: any) => {
    const { pages } = props;
    const navLinks = FIXED_LINKS.concat(pages.map((p: any) => ({ text: p.Titulo, link: `/${p.slug}` })));

    return (
        <>
            <Navbar links={navLinks} />
            <main className={pageStyles["page__main"]}>
                <section className={pageStyles["page__section-wrapper"]}>
                    <header className={pageStyles["page__title-text"]}>Contacto</header>
                </section>
                <section>
                    <p className={contactStyles["page__title-text--small"]}>Muchas gracias por tu mensaje, ha sido enviado correctamente. Me pondre en contacto contigo lo antes posible.</p>
                </section>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const pages = await fetchAPI(API_PATHS.pages);
    return {
        props: { pages }
    }
}


export default ContactSuccess
