using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Techies.MoneyExchange.DTOs.Response;
using Techies.MoneyExchange.Infrastructure.Persistence.EF.Core;

namespace Techies.MoneyExchange.Application.ExchangeRate
{
    public class ExchangeRateReadingService
    {
        private const string TimestampFormat = "s";

        private readonly MoneyExchangeDbContext _context;

        public ExchangeRateReadingService(MoneyExchangeDbContext context)
        {
            _context = context;
        }

        public async Task<ExchangeRateResponse> GetRatesAsync(string baseSymbol,params string[] symbol)
        {
            var rates =  _context.ExchangeRates.AsNoTracking()
                .OrderByDescending(x => x.Timestamp);
            
            var ratesQuery = symbol.Select(async(r)=> await rates.Where(x => x.BaseSymbol == baseSymbol && x.TargetSymbol == r)
                    .Select(x=> new Tuple<string,decimal?>(x.TargetSymbol,x.Rate))
                    .FirstOrDefaultAsync() ?? new Tuple<string,decimal?>(r,null));

            var exchangeRates = await Task.WhenAll(ratesQuery);

            var rateResponse = exchangeRates.ToDictionary(r => r.Item1,r => r.Item2);

            return new ExchangeRateResponse()
            {
                BaseSymbol = baseSymbol,
                Date = DateTime.UtcNow.ToString(TimestampFormat),
                Rates = rateResponse
            };
        }
    }
}
