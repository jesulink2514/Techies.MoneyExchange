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

        public async Task<ExchangeRateResponse> GetRatesAsync(string baseSymbol,string[] symbol)
        {
            var rates =  _context.ExchangeRates.AsNoTracking()
                .OrderByDescending(x => x.Timestamp);
            
            var ratesQuery = symbol.Select(r=> rates.Where(x => x.BaseSymbol == baseSymbol && x.TargetSymbol == r)
                .FirstOrDefaultAsync());

            var exchangeRates = await Task.WhenAll(ratesQuery);

            var rateResponse = exchangeRates.ToDictionary(r => r.TargetSymbol,r => r.Rate);

            return new ExchangeRateResponse()
            {
                BaseSymbol = baseSymbol,
                Date = DateTime.UtcNow.ToString(TimestampFormat),
                Rates = rateResponse
            };
        }
    }
}
