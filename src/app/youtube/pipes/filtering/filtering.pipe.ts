import { Pipe, PipeTransform } from '@angular/core';
import { VideoItem } from 'src/app/youtube/models/search-item.model';

@Pipe({
    name: 'filtering',
})
export class FilteringPipe implements PipeTransform {
    transform(value: VideoItem[], filterValue: string): VideoItem[] {
        const trimmed = filterValue.toLowerCase().trim();

        return this.filter(value, trimmed);
    }

    filter(value: VideoItem[], filterValue: string): VideoItem[] {
        return value.filter((item) => {
            const title = item.snippet.title.toLowerCase().trim();
            return title.indexOf(filterValue) !== -1;
        });
    }
}
