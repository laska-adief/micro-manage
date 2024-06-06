import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {}
