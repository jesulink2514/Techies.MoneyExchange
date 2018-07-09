using System.Collections.Generic;
using Newtonsoft.Json;

namespace Techies.MoneyExchange.DTOs.Response
{
    public class ExchangeRateResponse
    {
        public ExchangeRateResponse()
        {
            Rates = new Dictionary<string, decimal>();
        }
        [JsonProperty("base")]
        public string BaseSymbol { get; set; }
        [JsonProperty("date")]
        public string Date { get; set; }
        [JsonProperty("rates")]
        public  IDictionary<string,decimal> Rates { get; set; }
    }
}