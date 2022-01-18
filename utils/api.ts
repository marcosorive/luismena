import { API_URL } from "../constants";

const cachedCalls: any = {

}

export function getStrapiURL(path: string = ""): string {
    return `${API_URL || "http://localhost:8082"
        }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI<T>(path: string): Promise<T> {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
}

export async function fetchCachedApi<T>(path: string): Promise<T> {
    return await fetchAPI<T>(path);
    // if(cachedCalls[path]){
    //     return cachedCalls[path];
    // }else{
    //     const result = await fetchAPI<T>(path);
    //     cachedCalls[path] = result;
    //     return cachedCalls;
    // }
}
