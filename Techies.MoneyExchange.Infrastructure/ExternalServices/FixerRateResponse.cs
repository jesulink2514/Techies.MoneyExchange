using System.Collections.Generic;

namespace Techies.MoneyExchange.Infrastructure.ExternalServices
{
    public class FixerRateResponse
    {
        public bool Success { get; set; }
        public int Timestamp { get; set; }
        public string Base { get; set; }
        public string Date { get; set; }
        public IDictionary<string,decimal> Rates { get; set; }
    }
}