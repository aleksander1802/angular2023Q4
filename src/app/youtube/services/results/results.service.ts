import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResultResponse } from '../../models/search-response.model';
import { SearchItem } from '../../models/search-item.model';
import { mockResponse } from '../../../data/mock-response';

@Injectable({
    providedIn: 'root',
})
export class ResultsService {
    isResultsVisible = false;
    private mockResponse: SearchResultResponse = mockResponse;
    private mockItems: SearchItem[] = this.mockResponse.items;
    private searchResultsSubject = new BehaviorSubject<SearchItem[]>([]);
    public searchResults = this.searchResultsSubject.asObservable();

    getMockResponse() {
        return this.mockResponse;
    }

    getMockItems() {
        return this.mockItems;
    }

    getSearchResults(query: string) {
        const minLen = (item: SearchItem) => item.snippet.title.toLowerCase();

        const results = this.mockItems.filter((item) => minLen(item).includes(query));

        this.searchResultsSubject.next(results);
    }

    getItemById(id: string) {
        return this.mockItems.find((item) => item.id === id);
    }
}
