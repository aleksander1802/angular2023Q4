import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideoCardsState } from '../reducers/video-cards.reducer';

export const selectVideoCardsState = createFeatureSelector<VideoCardsState>('videoCards');

export const selectVideoCardItems = createSelector(
    selectVideoCardsState,
    (state) => state.videoItems
);

export const selectVideoCardVideosIds = createSelector(
    selectVideoCardsState,
    (state) => state.videoIds
);

export const selectVideoCardFavoriteIds = createSelector(
    selectVideoCardsState,
    (state) => state.favoriteIds
);

export const selectIsVideoCardsLoading = createSelector(
    selectVideoCardsState,
    (state) => state.isLoading
);
