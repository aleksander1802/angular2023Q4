import { createAction, props } from '@ngrx/store';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { VideoCardsActionTypes } from '../action-types/video-cards-action.types';

export const getVideoCard = createAction(
    VideoCardsActionTypes.GET_SEARCH_RESULTS
);

export const getVideoCardSuccess = createAction(
    VideoCardsActionTypes.GET_SEARCH_RESULTS_SUCCESS,
    props<{ videoCard: VideoItem[] }>()
);

export const getVideoCardFailure = createAction(
    VideoCardsActionTypes.GET_SEARCH_RESULTS_FAILURE,
    props<{ error: Error }>()
);

export const getNextPage = createAction(VideoCardsActionTypes.NEXT_PAGE);

export const getNextPageSuccess = createAction(
    VideoCardsActionTypes.NEXT_PAGE_SUCCESS,
    props<{ videoCard: VideoItem[] }>()
);
export const getPrevPage = createAction(VideoCardsActionTypes.PREV_PAGE);

export const getPrevPageSuccess = createAction(
    VideoCardsActionTypes.PREV_PAGE_SUCCESS,
    props<{ videoCard: VideoItem[] }>()
);
