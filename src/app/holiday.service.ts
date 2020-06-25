import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { environment as env } from '../environments/environment';
import { Constants } from './constants';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  holidays = [];
  constructor(
    private http: HttpClient
  ) {

    this.http.get('/assets/holidays.json').subscribe(data => {
      data['date'].forEach( val=>{
        this.holidays.push(formatDate(val,env.dateFormat, env.locale));
      });
    });

  }

  getHolidays(){
    return this.holidays;
  }

  checkHoliday() : boolean {

    var currDate = new Date();
    var id = this.holidays.findIndex(item=> item===formatDate(currDate,env.dateFormat, env.locale));
    if(id>=0 || Constants.DAYS.has(currDate.getDay()) || currDate.getHours()>Constants.STOCK_CLOSE_HOURS){
      return true;
    }

    return false;
  }
}
