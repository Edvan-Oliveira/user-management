import {Component, inject} from '@angular/core';
import {UserService} from '../../service/user.service';
import {SearchResponse} from '../../../../shared/dtos/search.response';
import {UserResponse} from '../../dtos/user.response';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {UserFilterRequest} from '../../dtos/user-filter.request';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    TableModule,
    CommonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  private userService = inject(UserService);

  userList: UserResponse[] = [];
  totalElements = 0;

  search(event: TableLazyLoadEvent) {
    this.userService.search(this.mountFilter(event)).subscribe((response: SearchResponse<UserResponse>) => {
      this.userList = response.content;
      this.totalElements = response.page.totalElements;
    });
  }

  mountFilter(event: TableLazyLoadEvent): UserFilterRequest {
    return {
      size: event.rows ?? 10,
      number: (event.first ?? 1) / (event.rows ?? 1)
    }
  }

}
