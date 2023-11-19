import { Component, OnInit } from '@angular/core';
import {
    FormGroup, Validators, FormArray, FormBuilder
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { CustomCardFormValue } from 'src/app/youtube/models/custom-card.model';
import { currentDateValidator } from '../../validators/future-date.validator';
import { urlValidator } from '../../validators/url-link.validator';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
    form!: FormGroup;

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
            imageLink: ['', [Validators.required, urlValidator()]],
            videoLink: ['', [Validators.required, urlValidator()]],
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
        const customCard = this.mapFormValueToCustomCard(this.form.value);

        this.onFormReset();
    }

    mapFormValueToCustomCard(formValue: CustomCardFormValue): VideoItem {
        return {
            id: this.generateUniqueId(),
            custom: true,
            snippet: {
                tags: formValue.tags.map((tag: { tag: string }) => tag.tag),
                title: formValue.title,
                description: formValue.description || 'Description is missing',
                publishedAt: formValue.creationDate,
                thumbnails: {
                    default: {
                        url: formValue.imageLink,
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: formValue.imageLink,
                        width: 320,
                        height: 180,
                    },
                    high: { url: formValue.imageLink, width: 480, height: 360 },
                    standard: {
                        url: formValue.imageLink,
                        width: 640,
                        height: 480,
                    },
                    maxres: {
                        url: formValue.imageLink,
                        width: 1280,
                        height: 720,
                    },
                },
            },
        };
    }

    generateUniqueId() {
        const uniqueId = uuidv4();

        return uniqueId;
    }
}
