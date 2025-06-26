import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AppMessageService} from '../services/app-message.service';
import {inject} from '@angular/core';

export function handleErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn, appMessageService= inject(AppMessageService)): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error?.messages) {
        error.error.messages.forEach((error: string) => appMessageService.error(error));
      } else {
        appMessageService.error('Ocorreu um erro inesperado.');
      }
      return throwError(() => new Error(error.error));
    })
  );

}
