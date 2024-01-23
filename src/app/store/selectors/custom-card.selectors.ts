import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CustomCardsState } from '../reducers/custom-card.reducer';

export const selectCustomCardsState = createFeatureSelector<CustomCardsState>('customCards');

export const selectCustomCardItems = createSelector(
    selectCustomCardsState,
    (state) => state.customItems
);

export const selectCustomCardById = (cardId: string) => createSelector(
    selectCustomCardItems,
    (customItems) => customItems.find((card) => card.id === cardId)
);

export const selectIsCustomCardSubmitted = createSelector(
    selectCustomCardsState,
    (state) => state.isSubmitted
);
