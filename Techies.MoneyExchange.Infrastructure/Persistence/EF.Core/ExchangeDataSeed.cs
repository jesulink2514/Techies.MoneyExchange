using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Techies.MoneyExchange.Domain;

namespace Techies.MoneyExchange.Infrastructure.Persistence.EF.Core
{
    /// <summary>
    /// Allow developers to seed initial data
    /// </summary>
    public class ExchangeDataSeed : IDisposable
    {
        private readonly MoneyExchangeDbContext _dbContext;

        public ExchangeDataSeed(MoneyExchangeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Initialize()
        {
            await _dbContext.Database.MigrateAsync();

            if (!await _dbContext.CurrencySymbols.AnyAsync())
            {
                await _dbContext.CurrencySymbols.AddRangeAsync(new[]
                {
                    new CurrencySymbol("USD"),
                    new CurrencySymbol("EUR")
                });
            }

            if (!await _dbContext.ExchangeRates.AnyAsync())
            {
                await _dbContext.ExchangeRates.AddRangeAsync(new[]
                {
                    new ExchangeRate("USD","EUR",0.852951m),
                    new ExchangeRate("EUR","USD",1.175641m)
                });
            }

            await _dbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dbContext?.Dispose();
        }
    }
}
