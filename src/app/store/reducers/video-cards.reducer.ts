import { createReducer, on } from '@ngrx/store';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import * as VideoCardActions from 'src/app/store/actions/video-cards.actions';

export interface VideoCardsState {
    videoItems: VideoItem[];
    videoIds: string[];
    favoriteIds: string[];
    isLoading: boolean;
}

const initialVideoCardsState: VideoCardsState = {
    videoItems: [],
    videoIds: [],
    favoriteIds: [],
    isLoading: false,
};

export const videoCardReducer = createReducer(
    initialVideoCardsState,
    on(
        VideoCardActions.getVideoCard,
        (state): VideoCardsState => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        VideoCardActions.getVideoCardSuccess,
        VideoCardActions.getNextPageSuccess,
        VideoCardActions.getPrevPageSuccess,
        (state, { videoCard }): VideoCardsState => {
            const newVideoIds = videoCard.map((item) => item.id);

            const updatedVideoIds = [...newVideoIds];

            return {
                ...state,
                videoItems: [...videoCard],
                videoIds: updatedVideoIds,
                isLoading: false,
            };
        }
    ),
    on(VideoCardActions.getVideoCardFailure, (state, { error }) => {
        console.error('Video card get failed:', error);

        return {
            ...state,
            isLoading: false,
        };
    })
);
