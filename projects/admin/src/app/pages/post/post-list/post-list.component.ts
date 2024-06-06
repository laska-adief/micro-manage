import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PostProps } from '../../../types/post';
import { PostService } from '../../../services/post.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getPosts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPosts() {
    this.subs = this.postService.getPosts().subscribe({
      next: (value) => {
        if (value) {
          this.posts = value;
          this.dataSource.data = this.posts;
        } else {
          this.posts = [];
          this.dataSource.data = [];
        }
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  handleAddPost() {
    this.router.navigate(['/post/form']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
