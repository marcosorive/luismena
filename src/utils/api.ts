import type { HomePage, Page } from "../Entities";
import { HOME_PAGE, PAGES } from "./content";

export function getPages(): Array<Page> {
    return PAGES;
}

export function getHomePage(): HomePage {
    return HOME_PAGE;
}
