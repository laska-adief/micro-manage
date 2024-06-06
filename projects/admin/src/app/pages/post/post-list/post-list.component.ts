import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PostProps } from '../../../types/post';
import { PostService } from '../../../services/post.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  displayedColumns: string[] = ['id', 'title', 'body', 'action'];
  dataSource = new MatTableDataSource();

  private subs!: Subscription;
  router = inject(Router);
  private postService = inject(PostService);
  posts: PostProps[] = [];
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getPosts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPosts() {
    this.isLoading = true;
    this.subs = this.postService.getPosts().subscribe({
      next: (value) => {
        if (value) {
          this.isLoading = false;
          this.posts = value;
          this.dataSource.data = this.posts;
        } else {
          this.isLoading = false;
          this.posts = [];
          this.dataSource.data = [];
        }
      },
      error: (error) => {
        console.log('error', error);
        this.isLoading = false;
      },
    });
  }

  handleAddPost() {
    this.router.navigate(['/post/add']);
  }

  handleEditPost(id: number, post: PostProps) {
    this.postService.selectedPost.next(post);
    this.router.navigate([`/post/edit/${id}`]);
  }

  handleDeletePost(id: number, post: PostProps) {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure want to delete this post?',
      html: `<b>Title</b>: ${post?.title}`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
    }).then((result) => {
      if (result?.isConfirmed) {
        this.postService.deletePost(id).subscribe({
          next: (value) => {
            if (value) {
              Swal.fire({
                icon: 'success',
                title: 'Post Deleted',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result?.isConfirmed) {
                  this.getPosts();
                }
              });
            }
          },
        });
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
