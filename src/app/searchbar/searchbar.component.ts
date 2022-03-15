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

  /**
   * variable initialization
   */
  formSearch!: FormGroup;
  isShownWarning: boolean = false;
  isShownError: boolean = false;
  isSendForm: boolean = false;

  urlCategories: string = `https://api.boardgameatlas.com/api/game/categories?pretty=true&client_id=bORVr4JTJS`;
  games: any;
  categories: any;

  /**
   * constructor
   * @param fb 
   * @param http 
   */
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

  /**
   * Fill categories list
   * @param url 
   */
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
      this.formSearch.get("category")?.disable;
    }
  }

  /**
   * search game function
   */
  async searchGame(){
    // we have to réinitialize variable (hide warnings/errors)
    this.games = [];
    this.isShownError = false;
    this.isShownWarning = false;
    this.isSendForm = false;

    // get form values
    let category = this.formSearch.get("category")?.value;
    let name = this.formSearch.get("name")?.value;
    let nbPlayerMin = this.formSearch.get("nbPlayerMin")?.value;
    let nbPlayerMax = this.formSearch.get("nbPlayerMax")?.value;

    // check if form field have been typed
    let nbErrors: number = 0;
    Object.keys(this.formSearch.controls).forEach(key => {
      if(!this.formSearch.controls[key].value){
        nbErrors += 1;
      }
    });

    // if none of the fields exists, display warning
    if(nbErrors < 4){
      try{
        const url = `https://api.boardgameatlas.com/api/search?client_id=bORVr4JTJS`;
        
        // deprecated api call
        // this.http.get(url).toPromise().then(data => {
        //   console.log(data);
        // });
    
        // typescript try, didn't have the time to do it properly, not used
        interface responseApi {
          count: string,
          games: [],
        }
  
        // add params to url
        let params = new HttpParams();
        params = params.append('name', name);
        category ? params = params.append('categories', category) : "";
        nbPlayerMin ? params = params.append('min_players', nbPlayerMin) : "";
        nbPlayerMax ? params = params.append('gt_max_players', nbPlayerMax) : "";

        // get http response
        let data: any = await firstValueFrom(this.http.get(url, { params: params }));
        let listGames = [];
  
        // add each board game to the list
        for(let key in data.games){
          let obj = data.games[key];
          listGames.push(obj);
        }
  
        this.games = listGames;
        this.isSendForm = true;

        this.games.length > 0 ? document.getElementById("categoriesContent")!.style.display = "none" : "";
  
      }catch(e){
        // api call didn't perform, display error
        this.isShownError = true;
      }
    }else{
      // display warning -> type one field to search properly !
      this.isShownWarning = true;
    }

  }

}
