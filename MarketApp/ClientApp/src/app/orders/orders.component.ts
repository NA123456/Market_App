import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Component, OnInit, ElementRef, ViewChild, Type, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MarketService } from '../../services/market.service';
import { connect } from 'net';
import { setTimeout } from 'timers';
import { StockComponent } from '../stock/stock.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  private hubConnection: HubConnection;
  errorMessage: any;
  stocks: any;
  boker: any;
  hasStocks: boolean;

  constructor(public http: Http, private _router: Router, private _marketService: MarketService) {

    this.stocks = _marketService._stocks.subscribe(data => {
      this.stocks = data;
      this.hasStocks = true;
      console.log("data:" + this.stocks)
    }); 

    var transport = signalR.HttpTransportType.WebSockets;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('/stock')
      .build();;

    this.GetUpdateOrdersOnConnect();

    this.StartConnection();


    setInterval(() => {
      this.GetUpdateOrders();
    }, 10000);

  
  }

  getBoker() {
    this._marketService.GetBoker()
      .subscribe(data => { this.boker = data; console.log(data); this.GetUpdateOrders();}
        , error => this.errorMessage = error)
  }

  GetUpdateOrders() {
    if (this.hasStocks)
    this.hubConnection.invoke('UpdateOrders', this.stocks , this.boker);
  }

  GetUpdateOrdersOnConnect() {

    this.hubConnection.on("UpdateOrders", (stocks, boker) => {
      console.log("UpdateOrders connected");
      this.boker = boker;
      console.log(boker);
      console.log(stocks);
    });
  }


  StartConnection() {

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started!'); this.getBoker();
      })
      .catch(err => console.log('Error while establishing connection')
      );


  }
}
