import {Component} from '@angular/core';
import {UserListComponent} from './components/user-list/user-list.component';
import {ButtonModule} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    UserListComponent,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
