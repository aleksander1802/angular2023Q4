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

describe('VideoCard Reducer', () => {
    const initialState: VideoCardsState = {
        videoItems: [],
        videoIds: [],
        favoriteIds: [],
        isLoading: false,
    };

    it('should update state on successful addToFavorites', () => {
        const videoId = '4';
        const state = videoCardReducer(
            initialState,
            VideoCardActions.addToFavorites({ videoId })
        );
        expect(state).toEqual({
            ...initialState,
            favoriteIds: ['4'],
        });
    });

    it('should update state on successful removeFromFavorites', () => {
        const modifiedInitialState: VideoCardsState = {
            ...initialState,
            favoriteIds: ['5'],
        };
        const state = videoCardReducer(
            modifiedInitialState,
            VideoCardActions.removeFromFavorites({ videoId: '5' })
        );
        expect(state).toEqual({
            ...modifiedInitialState,
            favoriteIds: [],
        });
    });
});
