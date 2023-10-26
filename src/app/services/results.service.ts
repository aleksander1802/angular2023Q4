import { Injectable } from '@angular/core';
import { SearchResultResponse } from '../models/search-response.model';
import { SearchItem } from '../models/search-item.model';
import { mockResponse } from '../data/mock-response';

@Injectable({
    providedIn: 'root',
})
export class ResultsService {
    mockResponse: SearchResultResponse;
    mockItems: SearchItem[];

    constructor() {
        this.mockResponse = mockResponse;
        this.mockItems = mockResponse.items;
    }

    getMockResponse() {
        return this.mockResponse;
    }

    getMockItems() {
        return this.mockItems;
    }
}
