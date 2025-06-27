import {Component, inject} from '@angular/core';
import {UserService} from '../../service/user.service';
import {SearchResponse} from '../../../../shared/dtos/search.response';
import {UserResponse} from '../../dtos/user.response';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {UserFilterRequest} from '../../dtos/user-filter.request';
import {UserFilterComponent} from '../user-filter/user-filter.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    TableModule,
    CommonModule,
    UserFilterComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  private userService = inject(UserService);

  userList: UserResponse[] = [];
  totalElements = 0;
  userFilter: UserFilterRequest = { number: 0 };

  onPage(event: TableLazyLoadEvent) {
    this.userFilter.size = event.rows ?? 10;
    this.userFilter.number = (event.first ?? 1) / (event.rows ?? 1);
    this.search();
  }

  search() {
    this.userService.search(this.userFilter).subscribe((response: SearchResponse<UserResponse>) => {
      this.userList = response.content;
      this.totalElements = response.page.totalElements;
    });
  }

  onSearch(event: UserFilterRequest) {
    this.userFilter.userId = event.userId;
    this.userFilter.userName = event.userName;
    this.userFilter.userEmail = event.userEmail;
    this.userFilter.number = 0;
    this.search();
  }
}
