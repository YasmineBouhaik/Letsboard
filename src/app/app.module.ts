import { JeuxService } from './services/jeux.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { LocalisationComponent } from './localisation/localisation.component';
import {HttpClientModule} from '@angular/common/http';
import { JeuxComponent } from './jeux/jeux.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CategoriesComponent,
    LocalisationComponent,
    JeuxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
