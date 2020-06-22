import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { APIService } from './api.service';

@NgModule({
  imports:      [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleChartsModule,
    RouterModule.forRoot([
      { path: '', component: StockListComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    StockListComponent],
  bootstrap:    [ AppComponent ],
  providers: [APIService]
})
export class AppModule { }
