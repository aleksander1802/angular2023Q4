import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import {
    selectCustomCardItems,
    selectIsCustomCardSubmitted,
    selectCustomCardsState,
} from './custom-card.selectors';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('CustomCard Selectors', () => {
    const mockState = {
        customCards: {
            customItems: [
                {
                    id: '1',
                    custom: true,
                    snippet: {
                        tags: [],
                        title: 'Test Title 1',
                        description: 'Test Description 1',
                        publishedAt: '2023-01-01',
                        thumbnails: {
                            default: {
                                url: 'https://example.com/image1.jpg',
                                width: 120,
                                height: 90,
                            },
                            medium: {
                                url: 'https://example.com/image1.jpg',
                                width: 320,
                                height: 180,
                            },
                            high: {
                                url: 'https://example.com/image1.jpg',
                                width: 480,
                                height: 360,
                            },
                            standard: {
                                url: 'https://example.com/image1.jpg',
                                width: 640,
                                height: 480,
                            },
                            maxres: {
                                url: 'https://example.com/image1.jpg',
                                width: 1280,
                                height: 720,
                            },
                        },
                    },
                },
                {
                    id: '2',
                    custom: true,
                    snippet: {
                        tags: [],
                        title: 'Test Title 2',
                        description: 'Test Description 2',
                        publishedAt: '2023-01-02',
                        thumbnails: {
                            default: {
                                url: 'https://example.com/image2.jpg',
                                width: 120,
                                height: 90,
                            },
                            medium: {
                                url: 'https://example.com/image2.jpg',
                                width: 320,
                                height: 180,
                            },
                            high: {
                                url: 'https://example.com/image2.jpg',
                                width: 480,
                                height: 360,
                            },
                            standard: {
                                url: 'https://example.com/image2.jpg',
                                width: 640,
                                height: 480,
                            },
                            maxres: {
                                url: 'https://example.com/image2.jpg',
                                width: 1280,
                                height: 720,
                            },
                        },
                    },
                },
            ],
            isSubmitted: false,
        },
    };

    it('should select custom card items', () => {
        const selected = selectCustomCardItems(mockState);
        expect(selected.length).toEqual(2);
        expect(selected[0].snippet.title).toEqual('Test Title 1');
        expect(selected[1].snippet.title).toEqual('Test Title 2');
    });

    it('should select is custom card submitted', () => {
        const selected = selectIsCustomCardSubmitted(mockState);
        expect(selected).toEqual(false);
    });

    it('should select custom cards state', () => {
        const selected = selectCustomCardsState(mockState);
        expect(selected).toEqual(mockState.customCards);
    });
});
