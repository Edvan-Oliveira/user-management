import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserCreateRequest} from '../dtos/user-create.request';
import {catchError, Observable} from 'rxjs';
import {UserResponse} from '../dtos/user.response';
import {UserUpdateRequest} from '../dtos/user-update.request';
import {SearchResponse} from '../../../shared/dtos/search.response';
import {UserFilterRequest} from '../dtos/user-filter.request';
import {BaseService} from '../../../core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private readonly API = 'http://localhost:8080/api/users'

  private http = inject(HttpClient);

  insert(dto: UserCreateRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.API, dto);
  }

  update(id: number, dto: UserUpdateRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.API}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  search(filter?: UserFilterRequest): Observable<SearchResponse<UserResponse>> {
    let params = this.toParams(filter);
    return this.http.get<SearchResponse<UserResponse>>(`${this.API}`, { params });
  }

  findById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API}/${id}`);
  }

}
