import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import * as VideoCardActions from './video-cards.actions';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('VideoCard Actions - Favorites', () => {
    it('should create addToFavorites action', () => {
        const videoId = '123';
        const action = VideoCardActions.addToFavorites({ videoId });
        expect(action.type).toEqual('[Video Cards] Add to Favorites');
        expect(action.videoId).toEqual(videoId);
    });

    it('should create removeFromFavorites action', () => {
        const videoId = '456';
        const action = VideoCardActions.removeFromFavorites({ videoId });
        expect(action.type).toEqual('[Video Cards] Remove from Favorites');
        expect(action.videoId).toEqual(videoId);
    });
});
