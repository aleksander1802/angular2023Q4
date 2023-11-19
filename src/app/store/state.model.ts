import { combineReducers } from '@ngrx/store';
import {
    CustomCardsState,
    customCardReducer,
} from './reducers/custom-card.reducer';

export interface AppState {
    customCards: CustomCardsState;
}

export const rootReducer = combineReducers({
    customCards: customCardReducer,
});
