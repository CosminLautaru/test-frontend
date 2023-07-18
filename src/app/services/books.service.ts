import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BookModel } from '../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService implements OnInit {

  books:BookModel[] = [];
  url = 'http://localhost:3000/api/books'

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.GetAllBooks()
  }


  GetAllBooks(){
    return this.http.get(this.url)
  }

  PostBook(book: BookModel){
    return this.http.post(this.url, book).subscribe(res=>res)
  }

  UpdateBook(book: BookModel, id:number){
    console.log(book)
    return this.http.put(this.url + `/${id}`, book).subscribe(res=>res)
  }

  DeleteBook(id:number){
    return this.http.delete(this.url + `/${id}`).subscribe(res=>res)
  }



}
