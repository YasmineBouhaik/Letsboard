import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(){
    const url = 'https://api.boardgameatlas.com/api/search?client_id=bORVr4JTJS&categories=2bdFPJUvFo';
    // return this.http.get('https://api.boardgameatlas.com/api/search?client_id=bORVr4JTJS&categories=2bdFPJUvFo');
    return this.http.get(url).pipe(map((response: any) => response.json()));
  }
}
