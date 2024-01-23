import { Injectable } from '@angular/core';
import {
    exhaustMap, map, catchError, of, switchMap
} from 'rxjs';
import { ResultsService } from 'src/app/youtube/services/results/results.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VideoCardActions from 'src/app/store/actions/video-cards.actions';

@Injectable()
export class VideoCardEffects {
    constructor(
        private actions$: Actions,
        private resultsService: ResultsService
    ) {}

    getVideoCard$ = createEffect(() => this.actions$.pipe(
        ofType(VideoCardActions.getVideoCard),
        exhaustMap(() => this.resultsService.getSearchResults().pipe(
            map((videoCard) => VideoCardActions.getVideoCardSuccess({
                videoCard,
            })),
            catchError((error) => of(VideoCardActions.getVideoCardFailure({ error })))
        ))
    ));

    getNextPage$ = createEffect(() => this.actions$.pipe(
        ofType(VideoCardActions.getNextPage),
        switchMap(() => this.resultsService.getNextPageResults().pipe(
            map((videoCard) => VideoCardActions.getNextPageSuccess({ videoCard })),
            catchError((error) => of(VideoCardActions.getVideoCardFailure({ error }))),

        ))
    ));

    getPrevPage$ = createEffect(() => this.actions$.pipe(
        ofType(VideoCardActions.getPrevPage),
        switchMap(() => this.resultsService.getPrevPageResults().pipe(
            map((videoCard) => VideoCardActions.getPrevPageSuccess({ videoCard })),
            catchError((error) => of(VideoCardActions.getVideoCardFailure({ error })))
        ))
    ));
}
