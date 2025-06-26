import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {UserCreateRequest} from '../../dtos/user-create.request';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {UserService} from '../../service/user.service';
import {AppMessageService} from '../../../../core/services/app-message.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, Button, InputTextModule, FloatLabel],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  appMessageService = inject(AppMessageService);

  user: UserCreateRequest = {name: '', email: '', password: '', passwordConfirmation: ''};
  userForm!: FormGroup;

  userId!: number;

  ngOnInit() {
    this.startForm();
  }

  constructor(private fb: FormBuilder) {
  }

  startForm() {
    this.populateUser()
    this.userForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        passwordConfirmation: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      },
      {
        validators: this.passwordsMatchValidator
      });
  }

  populateUser() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.userService.findById(this.userId).subscribe(user => {
        this.userForm.patchValue({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirmation: user.password
        });
      });
    }
  }

  passwordsMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const passwordConfirmation = group.get('passwordConfirmation')?.value;

    return password === passwordConfirmation ? null : {passwordMismatch: true};
  }

  submit() {
    this.user = Object.assign(this.user, this.userForm.value)
    if (this.userId) {
      this.userService.update(this.userId, this.user).subscribe(() => this.saveWithSuccess());
    } else {
      this.userService.insert(this.user).subscribe({
        next: () => this.saveWithSuccess()
      })
    }
  }

  saveWithSuccess() {
    this.router.navigate(['/home'])
      .then(() => this.appMessageService.success('Registro gravado com sucesso.'));
  }

}
