import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem } from 'src/app/models/search-item.model';
import { SortBy, SortOrder } from 'src/app/services/sort/sort.service';

@Pipe({
    name: 'sorting',
    pure: true,
})
export class SortingPipe implements PipeTransform {
    private cachedResults = new Map<string, SearchItem[]>();

    transform(value: SearchItem[], sortBy: SortBy, sortOrder: SortOrder): SearchItem[] {
        const cacheKey = JSON.stringify({ value, sortBy, sortOrder });
        if (this.cachedResults.has(cacheKey)) {
            const cachedValue = this.cachedResults.get(cacheKey);
            if (cachedValue) {
                return cachedValue;
            }
        }
        const sortedArray = this.sort([...value], sortBy, sortOrder);
        this.cachedResults.set(cacheKey, sortedArray);
        return sortedArray;
    }

    private sort(value: SearchItem[], sortBy: SortBy, sortOrder: SortOrder): SearchItem[] {
        return value.sort((a, b) => {
            const firstValue = sortBy === 'date'
                ? new Date(a.snippet.publishedAt).getTime()
                : Number(a.statistics.viewCount);
            const secondValue = sortBy === 'date'
                ? new Date(b.snippet.publishedAt).getTime()
                : Number(b.statistics.viewCount);
            if (sortOrder === 'asc') {
                return firstValue - secondValue;
            }
            return secondValue - firstValue;
        });
    }
}
