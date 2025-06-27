import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserFilterRequest} from '../../dtos/user-filter.request';

@Component({
  selector: 'app-user-filter',
  standalone: true,
  imports: [
    Button,
    FloatLabel,
    InputText,
    ReactiveFormsModule
  ],
  templateUrl: './user-filter.component.html',
  styleUrl: './user-filter.component.css'
})
export class UserFilterComponent implements OnInit {

  @Output("onSearch") onSearchEmitter = new EventEmitter<UserFilterRequest>();

  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      userId: [null],
      userName: [null],
      userEmail: [null]
    });
  }

  search() {
    this.onSearchEmitter.emit(this.filterForm.value);
  }

  clear() {
    this.filterForm.reset();
    this.search();
  }
}
