import { Hyperlink } from "../Entities";
import { RegalaLuzHeader } from "../components/regalaLuzHeader";

export const API_PATHS = {
    pages: '/paginas',
    homePage: '/pagina-de-inicio',
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

interface StringMap { [key: string]: JSX.Element; }


export const pageToSpecialComponent: StringMap = {
    'regala-luz': <RegalaLuzHeader />
}