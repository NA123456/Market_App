using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketApp.Entities;
using Microsoft.AspNetCore.Mvc;

namespace MarketApp.Controllers
{
    public class MarketController : Controller
    {

        private List<Stock> stocks = new List<Stock> {
           new Stock{
               Id=1,
               Name="Vianet",
               Price=0,
           },
           new Stock{
               Id=2,
               Name="Agritek",
                          Price=0,
},
            new Stock{
               Id=3,
               Name="Akamai",
                         Price=0,
 },           new Stock{
               Id=4,
               Name="Baidu",
                         Price=0,
},           new Stock{
               Id=5,
               Name="Blinkx",
                         Price=0,
 },           new Stock{
               Id=6,
               Name="Blucora",
                         Price=0,
 },           new Stock{
               Id=7,
               Name="Boingo",
                          Price=0,
},           new Stock{
               Id=8,
               Name="Brainybrawn",
                        Price=0,
  },           new Stock{
               Id=9,
               Name="Carbonite",
                        Price=0,
  },           new Stock{
               Id=10,
               Name="China Finance",
                        Price=0,
  },           new Stock{
               Id=11,
               Name="ChinaCache",
                        Price=0,
  },           new Stock{
               Id=12,
               Name="ADR",
                         Price=0,
 },           new Stock{
               Id=13,
               Name="ChitrChatr",
                         Price=0,
 },           new Stock{
               Id=14,
               Name="Cnova",
                      Price=0,
    },           new Stock{
               Id=15,
               Name="Cogent",
                      Price=0,
    },           new Stock{
               Id=16,
               Name="Crexendo",
                      Price=0,
    },           new Stock{
               Id=17,
               Name="CrowdGather",
                        Price=0,
  },           new Stock{
               Id=18,
               Name="EarthLink",
                       Price=0,
   },           new Stock{
               Id=19,
               Name="Eastern",
                         Price=0,
 },           new Stock{
               Id=20,
               Name="ENDEXX",
                         Price=0,
 },           new Stock{
               Id=21,
               Name="Envestnet",
                        Price=0,
  },           new Stock{
               Id=22,
               Name="Epazz",
                         Price=0,
 },           new Stock{
               Id=23,
               Name="FlashZero",
                          Price=0,
},           new Stock{
               Id=24,
               Name="Genesis",
                          Price=0,
},           new Stock{
               Id=25,
               Name="InterNAP",
                          Price=0,
},           new Stock{
               Id=26,
               Name="MeetMe",
                         Price=0,
 },           new Stock{
               Id=27,
               Name="Netease",
                         Price=0,
 },           new Stock{
               Id=28,
               Name="Qihoo",
                          Price=0,
},
       };

        private Boker boker = new Boker
        {
            Id = 1,
            Name = "Boker",
            Orders = new List<Order>(),
            Persons = new List<Person> {
                new Person{
                    Id=1,
                   Name="Client1",
                   Orders=new List<Order>()
                },
                new Person{
                    Id=2,
                   Name="Client2",
                   Orders=new List<Order>()
                },
            },

        };

        [HttpGet]
        [Route("api/Market/GetStocks")]
        public IEnumerable<Stock> GetStocks()
        {
            return stocks;
        }

        [HttpGet]
        [Route("api/Market/GetBoker")]
        public Boker GetBoker()
        {
            return boker;
        }
    }
}