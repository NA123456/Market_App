import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { StockComponent } from './stock/stock.component';
import { MarketService } from '../services/market.service';
import { AppComponent } from './app.component';
import { HttpClient } from '@aspnet/signalr';
import { HttpModule } from '@angular/http';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    StockComponent,
    AppComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'stock', component: StockComponent },
      { path: 'orders', component: OrdersComponent },
    ])
  ],
  providers: [ MarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
