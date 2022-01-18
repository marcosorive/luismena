export interface Hyperlink {
    text: string
    link: string
}

export interface Image {
    id: number
    name: string
    url: string
}
export interface Page {
    id: number
    Titulo: string
    Descripcion: string
    published_at: Date
    created_at: Date
    updated_at: Date
    slug: string
    Imagenes: Array<Image>
}