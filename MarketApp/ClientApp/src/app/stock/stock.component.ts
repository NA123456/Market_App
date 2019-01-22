import { HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Component, OnInit, ElementRef, ViewChild, Type, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MarketService } from '../../services/market.service';
import { connect } from 'net';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent {

  private hubConnection: HubConnection;
  errorMessage: any;
  public stocks: any; 
  boker: any;
  connected: any;



  constructor(public http: Http, private _router: Router, private _marketService: MarketService) {

    var transport = signalR.HttpTransportType.WebSockets;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('/stock')
      .build();;

    this.hubConnection.on("GetStocks", (stocks) => {
      console.log("GetStocks connected");
      console.log(stocks);
      this.stocks = stocks;
      this._marketService.SetStocks(stocks);
    });

    this.StartConnection();

    setInterval(() => {
      this.GetUpdatedStocks();
    }, 10000);

  }  

  getStocks() {
    this._marketService.getStocks()
      .subscribe(data => { this.stocks = data; console.log(data); this.GetUpdatedStocks(); }
        , error => this.errorMessage = error)
  }


  GetUpdatedStocks() {
    this.hubConnection.invoke('GetStocks', this.stocks);
  }


  StartConnection() {

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started!'); this.connected = true; this.getStocks();
      })
      .catch(err => console.log('Error while establishing connection')
     );


}

}
