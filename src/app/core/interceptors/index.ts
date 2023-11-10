import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CustomHttpInterceptor } from './custom-http-interceptor/custom-http.interceptor';

export const httpInterceptorProviders: Provider[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: CustomHttpInterceptor,
        multi: true,
    },
];
