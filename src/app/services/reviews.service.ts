import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewModel } from '../models/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  books:ReviewModel[] = [];
  url = 'http://localhost:3000/api/reviews'

  constructor(private http:HttpClient) { }

  GetAllReviews(){
    return this.http.get(this.url)
  }

  PostReview(review:ReviewModel){
    console.log(review)
    return this.http.post(this.url, review).subscribe(res=>res)
  }

  UpdateReview(review:ReviewModel, id:number){
    return this.http.put(this.url + `/${id}`, review).subscribe(res=>res)
  }

  DeleteReview(id:number){
    console.log(id)
    return this.http.delete(this.url + `/${id}`).subscribe(res=>res)
  }

  GetReviewsByBook(id:number){
    return this.http.get('http://localhost:3000/api/books/reviewsByBookId' + `/${id}`)
  }

}
