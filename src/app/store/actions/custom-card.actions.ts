import { createAction, props } from '@ngrx/store';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { CustomCardActionTypes } from '../action-types/custom-card-action-types';

export const createCustomCard = createAction(
    CustomCardActionTypes.CREATE,
    props<{ customCard: VideoItem }>()
);

export const createCustomCardSuccess = createAction(
    CustomCardActionTypes.CREATE_SUCCESS,
    props<{ customCard: VideoItem }>()
);

export const createCustomCardFailure = createAction(
    CustomCardActionTypes.CREATE_FAILURE,
    props<{ error: Error }>()
);

export const deleteCustomCard = createAction(
    CustomCardActionTypes.DELETE,
    props<{ cardId: string }>()
);

export const deleteCustomCardSuccess = createAction(
    CustomCardActionTypes.DELETE_SUCCESS
);

export const deleteCustomCardFailure = createAction(
    CustomCardActionTypes.DELETE_FAILURE,
    props<{ error: Error }>()
);

export const updateCustomCardStatus = createAction(
    CustomCardActionTypes.UPDATE_IS_SUBMITTING
);
