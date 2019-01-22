using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketApp.Entities
{
    public class Order
    {
        public int StockId { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public double Commission { get; set; }
    }
}
