using System;

namespace Techies.MoneyExchange.Domain
{
    public class ExchangeRate
    {
        protected ExchangeRate()
        {
        }
        public ExchangeRate(string baseSymbol, string targetSymbol, decimal rate = 1)
        {
            BaseSymbol = baseSymbol;
            TargetSymbol = targetSymbol;
            Rate = rate;
            Timestamp = DateTime.UtcNow;
        }
        public Guid Id { get; set; }
        public string BaseSymbol { get; set; }
        public string TargetSymbol { get; set; }
        public DateTime Timestamp { get; set; }
        public decimal Rate { get; set; }
    }
}