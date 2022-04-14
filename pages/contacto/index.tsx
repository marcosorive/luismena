import type { NextPage } from 'next'
import Image from "next/image";
import { Layout } from "../../components/layout";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { API_PATHS, FIXED_LINKS } from "../../constants";
import { fetchAPI } from "../../utils/api";
import EmailImage from "../../resources/contact_icon1.png";
import PhoneImage from "../../resources/contact_icon2.png";

import contactStyles from "./contact.module.scss";
import pageStyles from "../../styles/page.module.scss";

interface ContactSectionProps {
    headerImageSource: StaticImageData
    header: string
    content: string
}

const ConctactSection = (props: ContactSectionProps) => {
    const { headerImageSource, header, content } = props;
    return (
        <div className={contactStyles["contact__information-section"]}>
            <Image src={headerImageSource} />
            <h3>{header}</h3>
            <hr className={contactStyles["contact__information-inner-divider"]} />
            <h4>{content}</h4>
        </div>
    )
}

const Contacto: NextPage = (props: any) => {

    return (
        <main className={pageStyles["page__main"]}>
            <section className={pageStyles["page__section-wrapper"]}>
                <header className={pageStyles["page__title-text"]}>Contacto</header>
            </section>
            <section className={contactStyles["contact__information-wrapper"]}>
                <ConctactSection
                    headerImageSource={EmailImage}
                    header="EMAIL"
                    content="hola@estudioluismena.com"
                />
                <hr className={contactStyles["contact__information-divider"]} />
                <ConctactSection
                    headerImageSource={PhoneImage}
                    header="TELÉFONO"
                    content="609 604 003"
                />
            </section>
            <section className={pageStyles["page__section-wrapper--margin"]}>
                <header className={pageStyles["page__title-text--small"]}>Formulario de contacto</header>
                <main className={contactStyles["contact__form-main"]}>
                    <form className={contactStyles["contact__form-wrapper"]} action="/contacto/success" name="contact" method="POST" data-netlify="true">
                        <div className={contactStyles["contact__form-name-fields"]}>
                            <div className={contactStyles["contact__form-group"]}>
                                <label className={contactStyles["contact__form-label"]} htmlFor="nombre">Nombre *</label>
                                <input className={contactStyles["contact__form-input"]} type="text" name="nombre" id="nombre" placeholder="Chiquito de la Calzada" required />
                            </div>
                            <div className={contactStyles["contact__form-group"]}>
                                <label className={contactStyles["contact__form-label"]} htmlFor="email">Email *</label>
                                <input className={contactStyles["contact__form-input"]} type="email" name="email" id="email" placeholder="chiquito@calzada.com" required />
                            </div>
                            <div className={contactStyles["contact__form-group"]}>
                                <label className={contactStyles["contact__form-label"]} htmlFor="telefono">Telefono *</label>
                                <input className={contactStyles["contact__form-input"]} type="text" name="telefono" id="telefono" placeholder="600112233" required />
                            </div>
                        </div>
                        <div className={contactStyles["contact__form-group"]}>
                            <label className={contactStyles["contact__form-label"]} htmlFor='mensaje'>Mensaje *</label>
                            <textarea className={contactStyles["contact__form-input"]} name="mensaje" id="mensaje" rows={7} cols={30} required></textarea>
                        </div>
                        <button className={contactStyles["contact__form-submit"]} type="submit">Enviar mensaje</button>
                    </form>
                </main>
            </section>
        </main>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const pages = await fetchAPI(API_PATHS.pages);
    return {
        props: { pages }
    }
}


export default Contacto
