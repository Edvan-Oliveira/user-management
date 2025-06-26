import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {AppMessageService} from '../../../../core/services/app-message.service';
import {MessageService} from 'primeng/api';

fdescribe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        MessageService,
        AppMessageService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with submit button disabled', () => {
    const pButton = fixture.nativeElement.querySelector('#btnSubmit');
    const button = pButton.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should enable submit button when user form is valid', () => {
    component.userForm.patchValue({
      name: "Teste",
      email: "teste@email.com",
      password: "123456",
      passwordConfirmation: "123456"
    })
    fixture.detectChanges();
    const pButton = fixture.nativeElement.querySelector('#btnSubmit');
    const button = pButton.querySelector('button');
    expect(button.disabled).toBeFalse();
  });

});
