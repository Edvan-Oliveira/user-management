import {Routes} from '@angular/router';
import {NotFoundComponent} from './shared/layout/not-found/not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.routes').then(m => m.USER_ROUTES)
  },
  {path: '**', component: NotFoundComponent}
];
