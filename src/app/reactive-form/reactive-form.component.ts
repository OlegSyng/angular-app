import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';

interface ProjectNameError extends ValidationErrors {
  restrictedName: boolean;
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  projectForm!: FormGroup;
  statusList = ['Stable', 'Critical', 'Finished'];

  get invalidProjectName() {
    return this.projectForm.get('projectName')!.errors?.['restrictedName'];
  }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required],
        [this.forbiddenProjectNames]
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(this.statusList[1]),
    });
  }

  forbiddenProjectNames(
    control: AbstractControl<string, string>
  ): Promise<ProjectNameError | null> {
    const promise = new Promise<ProjectNameError | null>((resolve, reject) => {
      setTimeout(() => {
        if (control.value.toLowerCase() === 'test') {
          resolve({ restrictedName: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
