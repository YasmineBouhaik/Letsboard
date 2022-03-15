import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  boardGames: any = [];
  cardGames: any = [];
  strategyGames: any = [];

  constructor(http: HttpClient) {
    http.get('https://api.boardgameatlas.com/api/search?client_id=bORVr4JTJS&categories=KUBCKBkGxV&limit=4').subscribe( response => {
      console.log(response);
      this.boardGames = response;      
    })

    http.get('https://api.boardgameatlas.com/api/search?client_id=bORVr4JTJS&categories=eX8uuNlQkQ&limit=4').subscribe( response => {
        console.log(response);
        this.cardGames = response;
      })

    http.get('https://api.boardgameatlas.com/api/search?client_id=bORVr4JTJS&categories=ge8pIhEUGE&limit=4').subscribe( response => {
      console.log(response);
      this.strategyGames = response;
    })
  }
}



   
    
  

  
  
    
    
