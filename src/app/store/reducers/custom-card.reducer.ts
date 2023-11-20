import { createReducer, on } from '@ngrx/store';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import * as CustomCardActions from '../actions/custom-card.actions';

export interface CustomCardsState {
    customItems: VideoItem[];
    isSubmitted: boolean;
}

const initialCustomCardsState: CustomCardsState = {
    customItems: [],
    isSubmitted: false,
};

export const customCardReducer = createReducer(
    initialCustomCardsState,
    on(
        CustomCardActions.createCustomCard,
        (state, { customCard }): CustomCardsState => ({
            ...state,
            customItems: [...state.customItems, customCard],
            isSubmitted: true,
        })
    ),
    on(
        CustomCardActions.createCustomCardSuccess,
        (state): CustomCardsState => ({
            ...state,
        })
    ),
    on(CustomCardActions.createCustomCardFailure, (state, { error }) => {
        console.error('Custom card creation failed:', error);

        return {
            ...state,
            isSubmitted: false,
        };
    }),
    on(
        CustomCardActions.deleteCustomCard,
        (state, { cardId }): CustomCardsState => {
            const updatedCustomItems = state.customItems.filter(
                (card) => card.id !== cardId
            );

            return {
                ...state,
                customItems: updatedCustomItems,
            };
        }
    ),
    on(
        CustomCardActions.updateCustomCardStatus,
        (state): CustomCardsState => ({
            ...state,
            isSubmitted: false,
        })
    )
);
