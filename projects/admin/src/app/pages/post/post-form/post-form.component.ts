import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostService } from '../../../services/post.service';
import { PostProps } from '../../../types/post';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  router = inject(Router);
  fb = inject(FormBuilder);
  postForm!: FormGroup;
  postService = inject(PostService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  handleAddPost() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
    }

    if (this.postForm.valid) {
      console.log('value', this.postForm.value);
      this.postService?.addPost(this.postForm.value).subscribe({
        next: (value: PostProps) => {
          if (value) {
            Swal.fire({
              icon: 'success',
              title: 'Post Added!',
              html: `Title: ${value?.title} <br> Body: ${value?.body}`,
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result?.isConfirmed) {
                this.router.navigate(['/post/list']);
              }
            });
          }
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.postForm.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required';
    }

    return '';
  }
}
