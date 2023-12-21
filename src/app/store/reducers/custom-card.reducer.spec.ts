import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { customCardReducer, CustomCardsState } from './custom-card.reducer';
import * as CustomCardActions from '../actions/custom-card.actions';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('CustomCard Reducer', () => {
    let initialState: CustomCardsState;

    beforeEach(() => {
        initialState = {
            customItems: [],
            isSubmitted: false,
        };
    });

    it('should handle createCustomCard action', () => {
        const customCard: VideoItem = {
            id: '123',
            custom: true,
            snippet: {
                tags: [],
                title: 'Test Title',
                description: 'Test Description',
                publishedAt: '2023-01-01',
                thumbnails: {
                    default: {
                        url: 'https://example.com/image.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://example.com/image.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://example.com/image.jpg',
                        width: 480,
                        height: 360,
                    },
                    standard: {
                        url: 'https://example.com/image.jpg',
                        width: 640,
                        height: 480,
                    },
                    maxres: {
                        url: 'https://example.com/image.jpg',
                        width: 1280,
                        height: 720,
                    },
                },
            },
        };

        const action = CustomCardActions.createCustomCard({ customCard });
        const state = customCardReducer(initialState, action);

        expect(state.customItems.length).toEqual(1);
        expect(state.customItems[0]).toEqual(customCard);
        expect(state.isSubmitted).toEqual(true);
    });
});
