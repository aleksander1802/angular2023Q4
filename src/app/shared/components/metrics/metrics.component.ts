import {
    Component, Input, OnChanges, SimpleChanges
} from '@angular/core';
import { VideoItem } from 'src/app/youtube/models/search-item.model';

interface Metrics {
    icon: string;
    count: string;
}

@Component({
    selector: 'app-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnChanges {
    metricsData: Metrics[] = [];
    @Input() item: VideoItem | null = null;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['item'] && this.item) {
            const { statistics } = this.item;

            if (statistics) {
                this.metricsData = [
                    {
                        icon: 'visibility',
                        count: statistics.viewCount,
                    },
                    {
                        icon: 'thumb_up',
                        count: statistics.likeCount,
                    },
                    {
                        icon: 'star',
                        count: statistics.favoriteCount,
                    },
                    {
                        icon: 'comment',
                        count: statistics.commentCount,
                    },
                ];
            }
        }
    }
}
