import { Component, Input, OnInit } from '@angular/core';
import { SearchItem } from 'src/app/models/search-item.model';

interface Metrics {
    icon: string;
    count: string;
}

@Component({
    selector: 'app-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
    metricsData: Metrics[] = [];
    @Input() item!: SearchItem;

    ngOnInit() {
        if (this.item) {
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
                    icon: 'thumb_down',
                    count: this.item.statistics.dislikeCount,
                },
                {
                    icon: 'comment',
                    count: this.item.statistics.commentCount,
                },
            ];
        }
    }
}
