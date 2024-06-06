import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PostProps } from '../types/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);
  readonly BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
  constructor() {}

  getPosts() {
    return this.http.get<PostProps[]>(this.BASE_URL);
  }
}
