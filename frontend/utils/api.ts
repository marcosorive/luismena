import { API_PATHS } from "../constants";
import { PAGES, HOME_PAGE } from "./content";

const pathContentMap: Record<string, unknown> = {
    '/paginas': PAGES,
    '/pagina-de-inicio': HOME_PAGE
}

export function fetchAPI(path: string): unknown {
    return pathContentMap[path]
}

