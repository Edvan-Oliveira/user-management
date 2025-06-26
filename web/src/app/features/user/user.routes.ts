import {UserFormComponent} from './components/user-form/user-form.component';
import {UserDeleteComponent} from './components/user-delete/user-delete.component';
import {Routes} from '@angular/router';

export const USER_ROUTES: Routes = [
  {path: '', component: UserFormComponent},
  {path: 'edit/:id', component: UserFormComponent},
  {path: 'delete/:id', component: UserDeleteComponent}
];
