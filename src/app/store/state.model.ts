import { combineReducers } from '@ngrx/store';
import {
    CustomCardsState,
    customCardReducer,
} from './reducers/custom-card.reducer';
import {
    VideoCardsState,
    videoCardReducer,
} from './reducers/video-cards.reducer';

export interface AppState {
    customCards: CustomCardsState;
    videoCards: VideoCardsState;
}

export const rootReducer = combineReducers({
    customCards: customCardReducer,
    videoCards: videoCardReducer,
});
