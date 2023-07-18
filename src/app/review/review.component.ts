import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ReviewModel } from '../models/review.interface';
import { ReviewsService } from '../services/reviews.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookModel } from '../models/book.interface';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  reviews: ReviewModel[] = []
  constructor(private reviewService:ReviewsService,
    public dialogRef: MatDialogRef<ReviewUpdateDialog>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.getReviews(this.data);
    console.log(this.data)
  }

  openDialog(review:ReviewModel):void{
    review.book_id = this.data
    this.dialog.open(ReviewUpdateDialog, {
      width: '400px',
      height: '450px',
      data: review
    });
  }

  deleteReview(id:number){
    this.reviewService.DeleteReview(id)
    window.location.reload();
  }

  addReview(){
    let review = {} as ReviewModel
    this.openDialog(review)
    
  }

  async getReviews(id:number){
    this.reviewService.GetReviewsByBook(id).subscribe((res: any) => {
      this.reviews = res.reviews
    });
 
  }

}

@Component({
  selector: 'review-update-dialog',
  templateUrl: 'review-update-dialog.html',
  styleUrls: ['review-update-dialog.scss']
})
export class ReviewUpdateDialog implements OnInit{
  isReviewUpdated:boolean = false;

  bookId: number = 0;
  books: BookModel[] = []
  constructor(public dialogRef: MatDialogRef<ReviewUpdateDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: ReviewModel, 
    private reviewService: ReviewsService,
    private booksService: BooksService) {}
  
    ngOnInit(): void {
      if(this.data.review_text == undefined){
        this.isReviewUpdated = false
      }else{
        this.isReviewUpdated = true
      }

     this.booksService.GetAllBooks().subscribe((res:any)=>{
      this.books = res
     });


    }

  UpdateReview(){
    this.reviewService.UpdateReview(this.data, this.data.id)
    this.dialogRef.close();
  }
  addReview(){
    this.data.book_id
    this.reviewService.PostReview(this.data)
    this.dialogRef.close();
    window.location.reload();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getBookId(id:number){
    this.bookId = id;
  }
}
