export interface Hyperlink {
    text: string
    link: string
}

interface ImageFormat {
    url: string
    ext: string
    name: string
    width: number
    height: number
}

export interface Image {
    id: number
    name: string
    url: string
    width: number
    height: number
    formats: {
        large: ImageFormat
        medium: ImageFormat
        small: ImageFormat
        thumbnail: ImageFormat
    }
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

export interface SliderImage {
    source: string
}