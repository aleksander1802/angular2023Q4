import { SearchItem } from './search-item.model';

export interface SearchResultResponse {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: SearchItem[];
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}
