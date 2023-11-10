import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY, URL_COMMON } from '../../../../../constants';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const { url, method, params } = request;

        if (url.startsWith(URL_COMMON) && method === 'GET') {
            const modifiedParams = params.append('key', API_KEY);

            const modifiedRequest = request.clone({
                params: modifiedParams,
            });

            return next.handle(modifiedRequest);
        }

        return next.handle(request);
    }
}
