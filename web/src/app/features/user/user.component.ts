import {Component} from '@angular/core';
import {UserListComponent} from './components/user-list/user-list.component';
import {ButtonModule} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {UserFilterComponent} from './components/user-filter/user-filter.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    UserFilterComponent,
    UserListComponent,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
