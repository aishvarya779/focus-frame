export interface Photo {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string;
    photographer: string;
    tags: string[];
}

export interface Planet {
    id: number;
    name: string;
    description: string;
    image: string;
    isDestroyed: boolean;
    deletedAt: string | null;
}

export interface AnimeCharacter {
    affiliation: string;
    deletedAt: string | null;
    description: string;
    gender: string;
    id: number;
    image: string;
    ki: string;
    maxKi: string;
    name: string;
    race: string;
    tags?: string[];
}

export interface ApiMetadata {
    links: {
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    },
    meta: {
        currentPage: number;
        itemCount: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
    }
}
export interface PlanetApiResponse extends ApiMetadata {
    items: Planet[];
}

export interface AnimeCharacterApiResponse extends ApiMetadata {
    items: AnimeCharacter[];
}