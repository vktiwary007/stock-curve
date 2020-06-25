import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { APIService } from '../api.service';
import { Observable } from 'rxjs';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/takeWhile';
import {startWith, switchMap} from "rxjs/operators";
import { StockDetails } from '../stock-details';
import { HolidayService } from '../holiday.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocksMap: Map<String, StockDetails>;
  apiSymbols: Array<String>;
  value: Array<Array<any>>;
  error: any;
  alive: boolean;
  interval: number;
  dynamicResize: boolean;
  options;
  chart;
  stockAddedForm;
  priceSubscription;
  priceUpdateSubscription;

    constructor(
      private formBuilder: FormBuilder,
      private apiService: APIService,
      private holidayService: HolidayService
    ) {
      this.stockAddedForm = this.formBuilder.group({
        name: ''
      });
      this.alive = true;
      this.interval = 5000;
      this.stocksMap = new Map();
      this.dynamicResize = true;
      this.apiSymbols = [];
      this.value = [];
      this.options = {
          maintainAspectRatio: true,
          bars: 'horizontal',
          colors: ['#1b9e77'],
          hAxis: {minValue: 0}
      };

    }


     onSubmit(stockData) {

       if(!this.stocksMap.has(stockData.name.toUpperCase())){

         this.priceSubscription = this.apiService.getStockPrices(stockData.name).subscribe(
           stock => {
              this.stocksMap.set(stock['symbol'].toString(), {latestPrice: stock['latestPrice'], companyName: stock['companyName'], symbols: stock['symbol']} );
              this.value.push([stock['companyName'], stock['latestPrice'], stock['latestPrice']]);
              this.apiSymbols.push(encodeURIComponent(stockData.name));
              this.drawChart();
            }
         );
       }


     }


    getUpdatedPrice(){

      //to check for weekend and stock end day timing. Created a holiday service on my own for testing purpose
      //comment this code if this check is not needed
      var checkHoliday = this.holidayService.checkHoliday();
      if(checkHoliday){
        this.alive = false;
      }

      if(this.apiSymbols.length>0){
              this.priceUpdateSubscription = this.apiService.getUpdatedValue(this.apiSymbols.join())
              .subscribe( res => {

                Object.keys(res).map((key)=>{
                  this.stocksMap.get(key).latestPrice = res[key].quote.latestPrice;
                  var id = this.value.findIndex(item=> item[0]===this.stocksMap.get(key).companyName);
                  this.value[id][1] = res[key].quote.latestPrice;
                  this.value[id][2] = res[key].quote.latestPrice;
                })
                this.drawChart();
              });
       }
    }


    drawChart(){
      this.chart = {
        title:"Stock Prices",
        type:"BarChart",
        columns:[{label: 'Company', type: 'string'}, {label: 'Price', type: 'number'}, {role: "annotation" }],
        data:this.value
      };
    }

    ngOnInit() {
      //to keep refreshing stock value every 5 Seconds
      IntervalObservable.create(this.interval)
      .takeWhile(() => this.alive )
      .subscribe( res => {
        this.getUpdatedPrice();
      })
    }


    ngOnDestroy(){
      this.alive = false; // switches the IntervalObservable off
      //unsubscribe on destroy
      this.priceSubscription.unsubscribe();
      this.priceUpdateSubscription.unsubscribe();
    }

}
