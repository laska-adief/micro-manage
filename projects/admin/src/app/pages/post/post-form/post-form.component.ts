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
import { ActivatedRoute, Router } from '@angular/router';
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
  route = inject(ActivatedRoute);
  isEdit: boolean = false;
  postId: string | null = '';

  ngOnInit() {
    this.initForm();
    if(!this.router.url.includes('/post/add')) {
      this.checkIsEditPost();
    }
  }

  checkIsEditPost() {
    this.postId = this.route.snapshot.paramMap.get('id');
    const selectedPost = this.postService.selectedPost.value;
    if (selectedPost?.id?.toString() === this.postId) {
      this.isEdit = true;
      this.postForm.patchValue({
        title: selectedPost?.title,
        body: selectedPost?.body,
      });
    } else {
      this.isEdit = false;
      this.postService.selectedPost.next(null);
      this.router.navigate(['.../list'], { relativeTo: this.route });
    }
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
      this.postService?.addPost(this.postForm.value).subscribe({
        next: (value: PostProps) => {
          if (value) {
            Swal.fire({
              icon: 'success',
              title: 'Post Added!',
              html: `<b>Title</b>: ${value?.title} <br> <b>Body</b>: ${value?.body}`,
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result?.isConfirmed) {
                this.router.navigate(['.../list'], { relativeTo: this.route });
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

  handleEditPost() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
    }

    if (this.postId && this.postForm.valid) {
      const id = parseInt(this.postId);
      this.postService.editPost(id, this.postForm.value).subscribe({
        next: (value) => {
          if (value) {
            Swal.fire({
              icon: 'success',
              title: 'Post Updated!',
              html: `<b>Title</b>: ${value?.title} <br> <b>Body</b>: ${value?.body}`,
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result?.isConfirmed) {
                this.postService.selectedPost.next(null);
                this.router.navigate(['.../list'], { relativeTo: this.route });
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

  handleBackPostList() {
    this.postService.selectedPost.next(null);
    this.router.navigate(['.../list'], { relativeTo: this.route });
  }

  getErrorMessage(controlName: string): string {
    const control = this.postForm.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required';
    }

    return '';
  }
}
