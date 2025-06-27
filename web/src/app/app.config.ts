import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import {MessageService} from 'primeng/api';
import {AppMessageService} from './core/services/app-message.service';
import {handleErrorInterceptor} from './core/interceptors/handle-error.interceptor';
import {pendingRequestsInterceptor$} from 'ng-http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(
      withInterceptors([pendingRequestsInterceptor$, handleErrorInterceptor])
    ),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService,
    AppMessageService
  ],
};
