import { Component, ElementRef, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BooksService } from '../services/books.service';
import { BookModel } from '../models/book.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books:BookModel[] = []
  constructor(private booksService: BooksService, public dialog: MatDialog,
    private el: ElementRef){}
  
  ngOnInit(){
    this.getBooks()
  }


  
  
  
  AddBook(){
    let book = {} as BookModel;
    this.openDialog(book)
  }

  UpdateBook(book:BookModel){
    this.openDialog(book)
  }

  deleteBook(id:number){
  this.booksService.DeleteBook(id)
  this.getBooks()
  window.location.reload();
  }

  getBooks(){
    return this.booksService.GetAllBooks().subscribe((res: any)=>{
      this.books = res
    })
  }


  openDialog(book: BookModel): void {
    this.dialog.open(BookUpdateDialog, {
      width: '400px',
      height: '400px',
      data: book,
      
    });
  }

  openReviewTab(id:number){ 
    this.dialog.open(ReviewComponent, {
      width:'1200px',
      height: '400px',
      data: id
    })
  }

  


}


@Component({
  selector: 'book-update-dialog',
  templateUrl: 'book-update-dialog.html',
  styleUrls: ['book-update-dialog.scss']
})
export class BookUpdateDialog implements OnInit {
  isBookUpdated:boolean = false;
  constructor(public dialogRef: MatDialogRef<BookUpdateDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private bookService: BooksService) {}
  
  ngOnInit(): void {
    if(this.data.author == undefined){
      this.isBookUpdated = false
    }else{
      this.isBookUpdated = true
    }
  }

  UpdateBook(){
    this.bookService.UpdateBook(this.data, this.data.id)
    this.dialogRef.close();
  }
  AddBook(){
    this.bookService.PostBook(this.data)
    this.dialogRef.close();
    window.location.reload();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
