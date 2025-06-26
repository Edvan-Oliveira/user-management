import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {UserResponse} from '../../dtos/user.response';
import {UserService} from '../../service/user.service';
import {FieldsetModule} from 'primeng/fieldset';
import {Button} from 'primeng/button';
import {AppMessageService} from '../../../../core/services/app-message.service';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [FieldsetModule, Button, RouterLink],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css'
})
export class UserDeleteComponent implements OnInit {

  route = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);
  appMessageService = inject(AppMessageService);

  user: UserResponse = {id: 0, name: '', email: '', password: '', passwordConfirmation: ''};

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.userService.findById(userId).subscribe(response => {
        this.user = response;
      })
    }
  }

  delete() {
    this.userService.delete(this.user?.id).subscribe(() => {
      this.router.navigate(['/home'])
        .then(() => this.appMessageService.success('Registro deletado com sucesso'))
    })
  }
}
