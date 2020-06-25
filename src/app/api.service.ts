import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable , throwError as observableThrowError} from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { StockDetails } from './stock-details';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private http: HttpClient
  ) { }

  //Get Current stock price
  getStockPrices(stocks): Observable<StockDetails>{
    var restUrl = Constants.BASE_URL+Constants.VERSION+Constants.SYMBOL+stocks+Constants.API_QUOTE+'?token='+Constants.API_KEY;
    return this.http.get<StockDetails>(restUrl).pipe(map(data => data), catchError(this.handleError));
  }

  //Get list of updated stock prices of all added companies
  getUpdatedValue(stockSymbols){
   var restUrl = Constants.BASE_URL+Constants.VERSION+Constants.MARKET_SYMBOL+'?symbols='+stockSymbols+'&types=quote&token='+Constants.API_KEY;
   return this.http.get(restUrl).pipe(map(data => data), catchError(this.handleError));

 }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
