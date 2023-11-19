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
    @Input() item: VideoItem | undefined;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['item'] && this.item) {
            this.metricsData = [
                {
                    icon: 'visibility',
                    count: this.item.statistics.viewCount,
                },
                {
                    icon: 'thumb_up',
                    count: this.item.statistics.likeCount,
                },
                {
                    icon: 'star',
                    count: this.item.statistics.favoriteCount,
                },
                {
                    icon: 'comment',
                    count: this.item.statistics.commentCount,
                },
            ];
        }
    }
}
