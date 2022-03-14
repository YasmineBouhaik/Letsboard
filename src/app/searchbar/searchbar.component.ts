import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  formSearch!: FormGroup;
  public items: any;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      category: '',
      name: '',
      nbPlayerMin: '',
      nbPlayerMax: ''
    })
  }

  async searchGame(){
    let category = this.formSearch.get("category")?.value;
    let name = this.formSearch.get("name")?.value;
    let nbPlayerMin = this.formSearch.get("nbPlayerMin")?.value;
    let nbPlayerMax = this.formSearch.get("nbPlayerMax")?.value;


    try{
      const url = `https://api.boardgameatlas.com/api/search?name=${name}&client_id=bORVr4JTJS`;
      
      // this.http.get(url).toPromise().then(data => {
      //   console.log(data);
      // });
  
      interface responseApi {
        count: string,
        games: [],
    }

      let data: any = await firstValueFrom(this.http.get(url));
      let games = [];

      for(let key in data.games){
        let obj = data.games[key];
        games.push(obj);
      }

      this.items = games;
    }catch(e){
      console.log(e);
    }

  }

}
