import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PostProps } from '../types/post';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);
  readonly BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
  constructor() {}

  selectedPost = new BehaviorSubject<PostProps | null>(null);

  getPosts() {
    return this.http.get<PostProps[]>(this.BASE_URL);
  }

  addPost(post: PostProps) {
    return this.http.post<PostProps>(this.BASE_URL, post);
  }

  editPost(id: number, post: PostProps) {
    return this.http.patch<PostProps>(this.BASE_URL + '/' + id, post);
  }
}
