using MarketApp.Entities;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Subjects;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace MarketApp.Hubs
{
    public class StockHub : Hub
    {
    

        private List<Stock> _stocks = new List<Stock>();
        private readonly TimeSpan _updateInterval = TimeSpan.FromSeconds(10);
        private readonly Subject<Stock> _subject = new Subject<Stock>();

        public async void GetStocks(List<Stock> stocks) {
            _stocks = stocks;

            Random random = new Random();
            if (_stocks != null) 
                _stocks.ForEach(x => x.Price = random.NextDouble());

            await Clients.All.SendAsync("GetStocks", _stocks);
        }

        public async void UpdateOrders(List<Stock> stocks, Boker boker) {

            if (stocks?.Any() == true) { 

            Random random = new Random();

            var clients = boker.Persons;
            for (int i = 0; i < 10; i++)
                {

                    var randomPerson = random.Next(1, 4);
                var quantity = random.Next(1, 100);
                var stockIndex = random.Next(0,stocks.Count-1);
                if (randomPerson == 1)
                {
                    boker.Orders.Add(new Order
                    {
                        StockId = stocks[stockIndex].Id,
                        Price = stocks[stockIndex].Price,
                        Quantity = quantity,
                        Commission = (quantity * stocks[stockIndex].Price) / 100
                    });
                }
                else if (randomPerson != 4) {
                    boker.Persons[randomPerson - 2].Orders.Add(new Order
                    {
                        StockId = stocks[stockIndex].Id,
                        Price = stocks[stockIndex].Price,
                        Quantity = quantity,
                        Commission = ((quantity * stocks[stockIndex].Price) * 2) / 100

                    });
                }
            }
        }
            await Clients.All.SendAsync("UpdateOrders", stocks, boker);
        }



    }
}
