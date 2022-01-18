import { Hyperlink } from "../Entities";

export const API_URL = process.env.API_URL || 'localhost:1337';
export const API_PATHS = {
    pages: '/paginas',
    homePage: '/pagina-de-inicio'
}

export const FIXED_LINKS: Array<Hyperlink> = [
    {
        text: 'Luis Mena',
        link: '/'
    }, {
        text: 'Contacto',
        link: '/contacto'
    }
];