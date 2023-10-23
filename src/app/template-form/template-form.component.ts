import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
})
export class TemplateFormComponent {
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;
  subscriptionTypes = ['Basic', 'Advanced', 'Pro'];

  onSubmit() {
    console.log(this.signupForm.value);
  }
}
