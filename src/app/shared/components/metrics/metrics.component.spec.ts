import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { MetricsComponent } from './metrics.component';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('MetricsComponent', () => {
    let component: MetricsComponent;
    let fixture: ComponentFixture<MetricsComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(MetricsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set metricsData based on input item', () => {
        const mockItem: VideoItem = {
            id: '123',
            statistics: {
                viewCount: '100',
                likeCount: '50',
                favoriteCount: '10',
                commentCount: '30',
            },
            snippet: {
                publishedAt: 'string',
                title: 'string',
                description: 'string',
                thumbnails: {
                    default: {
                        url: 'formValue.imageLink',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'formValue.imageLink',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'formValue.imageLink',
                        width: 480,
                        height: 360,
                    },
                    standard: {
                        url: 'formValue.imageLink',
                        width: 640,
                        height: 480,
                    },
                    maxres: {
                        url: 'formValue.imageLink',
                        width: 1280,
                        height: 720,
                    },
                },
                tags: [],
            },
        };

        component.item = mockItem;
        component.ngOnChanges({
            item: {
                currentValue: mockItem,
                previousValue: undefined,
                firstChange: false,
                isFirstChange(): boolean {
                    throw new Error('Function not implemented.');
                },
            },
        });

        const expectedMetricsData = [
            {
                icon: 'visibility',
                count: '100',
            },
            {
                icon: 'thumb_up',
                count: '50',
            },
            {
                icon: 'star',
                count: '10',
            },
            {
                icon: 'comment',
                count: '30',
            },
        ];

        expect(component.metricsData).toEqual(expectedMetricsData);
    });

    it('should not set metricsData if item is null', () => {
        component.item = null;
        component.ngOnChanges({
            item: {
                currentValue: null,
                previousValue: undefined,
                firstChange: false,
                isFirstChange(): boolean {
                    throw new Error('Function not implemented.');
                },
            },
        });

        expect(component.metricsData).toEqual([]);
    });
});
