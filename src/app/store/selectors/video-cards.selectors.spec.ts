import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { VideoCardsState } from '../reducers/video-cards.reducer';
import {
    selectVideoCardItems,
    selectVideoCardVideosIds,
    selectVideoCardFavoriteIds,
    selectIsVideoCardsLoading,
} from './video-cards.selectors';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('VideoCard Selectors', () => {
    const mockThumbnail: VideoItem['snippet']['thumbnails'] = {
        default: { url: 'default-url', width: 120, height: 90 },
        medium: { url: 'medium-url', width: 320, height: 180 },
        high: { url: 'high-url', width: 480, height: 360 },
        standard: { url: 'standard-url', width: 640, height: 480 },
        maxres: { url: 'maxres-url', width: 1920, height: 1080 },
    };

    const mockSnippet: VideoItem['snippet'] = {
        publishedAt: '2023-01-01T12:00:00Z',
        title: 'Mock Video',
        description: 'This is a mock video',
        thumbnails: mockThumbnail,
        tags: ['tag1', 'tag2'],
        categoryId: '1',
        defaultAudioLanguage: 'en',
    };

    const initialState: { videoCards: VideoCardsState } = {
        videoCards: {
            videoItems: [
                { id: '1', favorite: true, snippet: mockSnippet },
                { id: '2', favorite: false, snippet: mockSnippet },
                { id: '3', favorite: true, snippet: mockSnippet },
            ],
            videoIds: ['1', '2', '3'],
            favoriteIds: ['1', '3'],
            isLoading: false,
        },
    };

    it('should select videoItems', () => {
        expect(selectVideoCardItems.projector(initialState.videoCards)).toEqual(
            initialState.videoCards.videoItems
        );
    });

    it('should select videoIds', () => {
        expect(
            selectVideoCardVideosIds.projector(initialState.videoCards)
        ).toEqual(initialState.videoCards.videoIds);
    });

    it('should select favoriteIds', () => {
        expect(
            selectVideoCardFavoriteIds.projector(initialState.videoCards)
        ).toEqual(initialState.videoCards.favoriteIds);
    });

    it('should select isLoading', () => {
        expect(
            selectIsVideoCardsLoading.projector(initialState.videoCards)
        ).toEqual(initialState.videoCards.isLoading);
    });
});
