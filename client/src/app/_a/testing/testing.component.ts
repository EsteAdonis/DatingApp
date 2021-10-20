import { Component, OnInit } from '@angular/core';
import * as book from 'books.json';

interface IDemoData {
  bookID: number, 
  title: string,
  author: string,
  publicationYear: string
}

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  demoData: IDemoData[] = [
    {
        bookID: 1,
        title: "Goodnight Moon",
        author: "Margaret Wise Brown",
        publicationYear: "1953"
    },
    {
        "bookID": 2,
        "title": "Winnie-the-Pooh",
        "author": "A. A. Milne",
        "publicationYear": "1926"
    },
    {
      "bookID": 3,
      "title": "Where the Wild Things Are",
      "author": "Maurice Sendak",
      "publicationYear": "1963"
    },
    {
        "bookID": 4,
        "title": "The Hobbit",
        "author": "J. R. R. Tolkien",
        "publicationYear": "1937"
    },
    {
        "bookID": 5,
        "title": "Curious George",
        "author": "H. A. Rey",
        "publicationYear": "1941"
    },
    {
        "bookID": 6,
        "title": "Alice's Adventures in Wonderland",
        "author": "Lewis Carroll",
        "publicationYear": "1865"
    }      
  ]


  constructor() { }

  ngOnInit(): void {
    const result = this.demoData.filter(b => b.publicationYear > "1900");
  }

}
