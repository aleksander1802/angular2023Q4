import { VideoItem } from 'src/app/youtube/models/search-item.model';
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

describe('VideoCard Actions', () => {
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

    it('should create getVideoCard action', () => {
        const action = VideoCardActions.getVideoCard();
        expect(action.type).toEqual(
            '[Search results page API] Get video cards'
        );
    });

    it('should create getVideoCardSuccess action', () => {
        const videoCard: VideoItem[] = [
            { id: '1', favorite: true, snippet: mockSnippet },
        ];
        const action = VideoCardActions.getVideoCardSuccess({ videoCard });
        expect(action.type).toEqual(
            '[Search results page API] Get video cards success'
        );
        expect(action.videoCard).toEqual(videoCard);
    });

    it('should create getVideoCardFailure action', () => {
        const error = new Error('Some error');
        const action = VideoCardActions.getVideoCardFailure({ error });
        expect(action.type).toEqual(
            '[Search results page API] Get video cards failure'
        );
        expect(action.error).toEqual(error);
    });
});
