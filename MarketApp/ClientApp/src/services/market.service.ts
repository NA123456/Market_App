import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class MarketService {

  myAppUrl: string = "";
  private stocks = new Subject<any>();

  _stocks = this.stocks.asObservable([]);

  constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }


  getStocks() {
    return this._http.get(this.myAppUrl + 'api/Market/GetStocks')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);

  }

  GetBoker() {
    return this._http.get(this.myAppUrl + 'api/Market/GetBoker')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  SetStocks(stocks) {
    this.stocks.next(stocks);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }

}
