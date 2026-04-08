import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './book.html',
  styleUrl: './book.scss',
})
export class Book {
  isbnId = input<string>(''); 

}
