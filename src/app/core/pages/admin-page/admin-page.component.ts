import { Component, OnInit } from '@angular/core';
import {
    FormGroup, Validators, FormArray, FormBuilder
} from '@angular/forms';
import { currentDateValidator } from '../../validators/future-date.validator';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            title: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                ],
            ],
            description: ['', [Validators.maxLength(255)]],
            imageLink: ['', [Validators.required]],
            videoLink: ['', [Validators.required]],
            creationDate: ['', [Validators.required, currentDateValidator()]],
            tags: this.fb.array([this.createTagFormControl()]),
        });
    }

    getError(controlName: string, errorName: string) {
        return this.form.get(controlName)?.hasError(errorName);
    }

    get title() {
        return this.form.get('title');
    }

    get description() {
        return this.form.get('description');
    }

    get imageLink() {
        return this.form.get('imageLink');
    }

    get videoLink() {
        return this.form.get('videoLink');
    }

    get creationDate() {
        return this.form.get('creationDate');
    }

    get tags(): FormArray {
        return this.form.get('tags') as FormArray;
    }

    createTagFormControl(): FormGroup {
        return this.fb.group({
            tag: ['', Validators.required],
        });
    }

    addTagInput() {
        if (this.tags.length < 5) {
            this.tags.push(this.createTagFormControl());
        }
    }

    onFormReset() {
        this.form.reset();
        this.form.setControl(
            'tags',
            this.fb.array([this.createTagFormControl()])
        );
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        this.onFormReset();
        this.isSubmitted = false;
    }
}
