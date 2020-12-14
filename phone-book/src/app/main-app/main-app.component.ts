import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-main-app',
  template: `
    <div>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div>
            <div>
              <label>First Name</label>
              <input type="text" formControlName="firstName" name="firstName"  id="firstName" class="userFirstname" [ngClass]="{ 'is-invalid': submitted && f.firstName.errors }" />
              <div *ngIf="submitted && f.firstName.errors" class="invalid-feedback">
                <div *ngIf="f.firstName.errors.required">First Name is required</div>
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" formControlName="lastName" name="lastName" id="lastName" class="userLastname" [ngClass]="{ 'is-invalid': submitted && f.lastName.errors }" />
              <div *ngIf="submitted && f.lastName.errors" class="invalid-feedback">
                <div *ngIf="f.lastName.errors.required">Last Name is required</div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>Phone</label>
              <input type="tel" formControlName="phone" name="phoneNumber" id="phoneNumber" class="userPhone" [ngClass]="{ 'is-invalid': submitted && f.phone.errors }" />
              <div *ngIf="submitted && f.phone.errors" class="invalid-feedback">
                <div *ngIf="f.phone.errors.required">Phone is required</div>
                <div *ngIf="f.phone.errors.email">Phone must be a valid</div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button value="submit" class="submitButton">Submit</button>
            <button class="btn btn-secondary" type="reset" (click)="onReset()">Cancel</button>
          </div>
      </form>
    </div>

    <div class="informationTable">
      <table>
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let entry of entries" >
          <td>{{ entry.firstName }}</td>
          <td>{{ entry.lastName }}</td>
          <td>{{ entry.phone }}</td>
        </tr>
        </tbody>
      </table>
    </div>`,
  styles: []
})

export class MainAppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
    }, {

    });
  }

  get f() { return this.registerForm.controls; }

  entries = [];
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.entries.push(this.registerForm.value);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
