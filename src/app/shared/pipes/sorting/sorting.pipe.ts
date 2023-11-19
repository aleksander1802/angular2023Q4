import { Pipe, PipeTransform } from '@angular/core';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { SortBy, SortOrder } from 'src/app/youtube/services/sort/sort.service';

@Pipe({
    name: 'sorting',
    pure: true,
})
export class SortingPipe implements PipeTransform {
    private cachedResults = new Map<string, VideoItem[]>();

    transform(
        value: VideoItem[],
        sortBy: SortBy,
        sortOrder: SortOrder
    ): VideoItem[] {
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

    private sort(
        value: VideoItem[],
        sortBy: SortBy,
        sortOrder: SortOrder
    ): VideoItem[] {
        return value.sort((a, b) => {
            const firstValue = sortBy === 'date'
                ? new Date(a.snippet.publishedAt).getTime()
                : Number(a?.statistics?.viewCount || 0);
            const secondValue = sortBy === 'date'
                ? new Date(b.snippet.publishedAt).getTime()
                : Number(b?.statistics?.viewCount || 0);
            if (sortOrder === 'asc') {
                return firstValue - secondValue;
            }
            return secondValue - firstValue;
        });
    }
}
