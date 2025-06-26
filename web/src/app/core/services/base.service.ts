import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BaseFilterRequest} from '../../shared/dtos/base-filter.request';
import {throwError} from 'rxjs';

export abstract class BaseService {

  protected toParams(filter?: BaseFilterRequest): HttpParams {
    let params = new HttpParams();

    if (!filter) {
      return params;
    }

    for (const [key, value] of Object.entries(filter)) {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    }

    return params;
  }

}
