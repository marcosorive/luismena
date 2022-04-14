import { API_URL } from "../constants";

export function getStrapiURL(path: string = ""): string {
    return `${API_URL || "http://localhost:8082"
        }${path}`;
}

export async function fetchAPI<T>(path: string): Promise<T> {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
}

