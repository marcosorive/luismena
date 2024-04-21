export interface Hyperlink {
    text: string
    link: string
}

interface ImageFormat {
    url: string
    ext?: string
    name: string
    width?: number
    height?: number
    hash?: string
    mime?: string
    size?: number
    path?: unknown
    provider_metadata: unknown
}

export interface Image {
    id: number
    name: string
    alternativeText?: string
    caption?: string
    url: string
    width: number
    height: number
    hash?: string
    ext?: string
    mime?: string
    size?: number
    previewUrl?: string | null
    provider?: string
    provider_metadata?: unknown
    created_at?: string
    updated_at?: string
    formats: {
        thumbnail: ImageFormat
        large: ImageFormat
        medium: ImageFormat
        small: ImageFormat
    }
}
export interface Page {
    id: number
    Titulo: string
    Descripcion: string
    published_at?: string
    created_at?: string
    updated_at?: string
    slug: string
    Imagenes: Array<Image>
}

export interface SliderImage {
    source: string
    alt: string
}