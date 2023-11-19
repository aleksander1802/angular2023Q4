export interface SearchItem {
    kind?: string;
    etag?: string;
    id: SearchID;
    snippet: Snippet;
    statistics?: Statistics;
}

export interface VideoItem extends Omit<SearchItem, 'id'> {
    id: string;
    custom?: boolean;
    favorite?: boolean;
}

export interface SearchID {
    kind: string;
    videoId: string;
}

export interface Snippet {
    publishedAt: string;
    channelId?: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle?: string;
    tags: string[];
    categoryId?: string;
    liveBroadcastContent?: string;
    localized?: Localized;
    defaultAudioLanguage?: string;
}

export interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface Localized {
    title: string;
    description: string;
}

export interface Statistics {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
}
