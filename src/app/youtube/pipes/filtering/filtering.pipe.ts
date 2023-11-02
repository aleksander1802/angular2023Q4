import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem } from 'src/app/youtube/models/search-item.model';

@Pipe({
    name: 'filtering',
})
export class FilteringPipe implements PipeTransform {
    transform(value: SearchItem[], filterValue: string): SearchItem[] {
        const trimmed = filterValue.toLowerCase().trim();

        return this.filter(value, trimmed);
    }

    filter(value: SearchItem[], filterValue: string): SearchItem[] {
        return value.filter((item) => {
            const title = item.snippet.title.toLowerCase().trim();
            return title.indexOf(filterValue) !== -1;
        });
    }
}
