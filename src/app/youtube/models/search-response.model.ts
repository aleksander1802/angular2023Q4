import { SearchItem, VideoItem } from './search-item.model';

export interface SearchResultResponse {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: SearchItem[];
    nextPageToken: string;
    prevPageToken: string;
}

export interface SearchVideoResponse
    extends Omit<SearchResultResponse, 'items'> {
    items: VideoItem[];
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export type PageTokens =
    | {
        prevPageToken: string | null;
    }
    | {
        nextPageToken: string | null;
    }
    | undefined;
