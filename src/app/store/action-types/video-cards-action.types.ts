export enum VideoCardsActionTypes {
    GET_SEARCH_RESULTS = '[Search results page API] Get video cards',
    GET_SEARCH_RESULTS_SUCCESS = '[Search results page API] Get video cards success',
    GET_SEARCH_RESULTS_FAILURE = '[Search results page API] Get video cards failure',

    NEXT_PAGE = '[Search results page API] Go to next page',
    NEXT_PAGE_SUCCESS = '[Search results page API] Go to next page success',
    NEXT_PAGE_FAILURE = '[Search results page API] Go to next page failure',

    PREV_PAGE = '[Search results page API] Go to prev page',
    PREV_PAGE_SUCCESS = '[Search results page API] Go to prev page success',
    PREV_PAGE_FAILURE = '[Search results page API] Go to prev page failure',

    ADD_TO_FAVORITES = '[Video Cards] Add to Favorites',

    REMOVE_FROM_FAVORITES = '[Video Cards] Remove from Favorites',
}
