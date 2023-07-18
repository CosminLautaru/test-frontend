import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-frontend';
  constructor(private http: HttpClient){

  }

  TestFunction(){
    return this.http.get('http://localhost:3000/api/reviews').subscribe( res => {
      console.log(res)
    })
  }
}
