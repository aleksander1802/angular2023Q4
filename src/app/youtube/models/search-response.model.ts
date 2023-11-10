import { SearchItem, VideoItem } from './search-item.model';

export interface SearchResultResponse {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: SearchItem[];
}

export interface SearchVideoResponse extends Omit<SearchResultResponse, 'items'> {
    items: VideoItem[];
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}
