import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { videoCardReducer, VideoCardsState } from './video-cards.reducer';
import * as VideoCardActions from '../actions/video-cards.actions';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('VideoCard Reducer - Pagination', () => {
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

    const initialState: VideoCardsState = {
        videoItems: [],
        videoIds: [],
        favoriteIds: [],
        isLoading: false,
    };

    it('should update state on successful getNextPageSuccess', () => {
        const videoCard = [
            {
                id: '2',
                favorite: true,
                snippet: mockSnippet,
            },
        ];
        const state = videoCardReducer(
            initialState,
            VideoCardActions.getNextPageSuccess({ videoCard })
        );
        expect(state).toEqual({
            ...initialState,
            videoItems: videoCard,
            videoIds: ['2'],
            isLoading: false,
        });
    });

    it('should update state on successful getPrevPageSuccess', () => {
        const videoCard = [
            {
                id: '3',
                favorite: true,
                snippet: mockSnippet,
            },
        ];
        const state = videoCardReducer(
            initialState,
            VideoCardActions.getPrevPageSuccess({ videoCard })
        );
        expect(state).toEqual({
            ...initialState,
            videoItems: videoCard,
            videoIds: ['3'],
            isLoading: false,
        });
    });
});
