import { HttpClient, HttpParams } from '@angular/common/http';
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
  isShownWarning: boolean = false;
  isShownError: boolean = false;
  isSendForm: boolean = false;

  urlCategories: string = `https://api.boardgameatlas.com/api/game/categories?pretty=true&client_id=bORVr4JTJS`;
  games: any;
  categories: any;

  constructor(private fb: FormBuilder, private http: HttpClient) { 
    this.getCategories(this.urlCategories);
  }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      category: [''],
      name: '',
      nbPlayerMin: '',
      nbPlayerMax: ''
    })
  }

  async getCategories(url: string){

    try{
      let data: any = await firstValueFrom(this.http.get(url));
      let listCategories = [];
      for(let key in data.categories){
        let obj = data.categories[key];
        listCategories.push(obj);
      }

      this.categories = listCategories;

    }catch(e){
      console.log(e);
      this.formSearch.get("ctegory")?.disable;
    }
  }

  async searchGame(){
    this.games = [];
    this.isShownError = false;
    this.isShownWarning = false;
    this.isSendForm = false;

    let category = this.formSearch.get("category")?.value;
    let name = this.formSearch.get("name")?.value;
    let nbPlayerMin = this.formSearch.get("nbPlayerMin")?.value;
    let nbPlayerMax = this.formSearch.get("nbPlayerMax")?.value;

    let nbErrors: number = 0;
    Object.keys(this.formSearch.controls).forEach(key => {
      if(!this.formSearch.controls[key].value){
        nbErrors += 1;
      }
    });

    if(nbErrors < 4){
      try{
        const url = `https://api.boardgameatlas.com/api/search?client_id=bORVr4JTJS`;
        
        // this.http.get(url).toPromise().then(data => {
        //   console.log(data);
        // });
    
        interface responseApi {
          count: string,
          games: [],
      }
  
        let params = new HttpParams();
        params = params.append('name', name);
        category ? params = params.append('categories', category) : "";
        nbPlayerMin ? params = params.append('gt_min_players', nbPlayerMin) : "";
        nbPlayerMax ? params = params.append('max_players', nbPlayerMax) : "";

        let data: any = await firstValueFrom(this.http.get(url, { params: params }));
        let listGames = [];
  
        for(let key in data.games){
          let obj = data.games[key];
          listGames.push(obj);
        }
  
        this.games = listGames;
        this.isSendForm = true;
  
      }catch(e){
        this.isShownError = true;
      }
    }else{
      this.isShownWarning = true;
    }

  }

}
