import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable , throwError as observableThrowError} from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { StockDetails } from './stock-details';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  API_KEY = environment.api_token;
  BASE_URL = environment.base_url;
  VERSION = environment.version;
  SYMBOL =  environment.symbol_stock;
  MARKET_SYMBOL = environment.symbol_market;
  API_QUOTE = environment.api_001;
  API_COMPANY = environment.api_002;

  constructor(
    private http: HttpClient
  ) { }

  //Get Current stock price
  getStockPrices(stocks): Observable<StockDetails>{
    var restUrl = this.BASE_URL+this.VERSION+this.SYMBOL+stocks+this.API_QUOTE+'?token='+this.API_KEY;
    return this.http.get<StockDetails>(restUrl).pipe(map(data => data), catchError(this.handleError));
  }

  //Get list of updated stock prices of all added companies
  getUpdatedValue(stockSymbols){
   var restUrl = this.BASE_URL+this.VERSION+this.MARKET_SYMBOL+'?symbols='+stockSymbols+'&types=quote&token='+this.API_KEY;
   return this.http.get(restUrl).pipe(map(data => data), catchError(this.handleError));

 }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
