using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Techies.MoneyExchange.Infrastructure.Persistence.EF.Core;

namespace Techies.MoneyExchange.Application.Currency
{
    public class CurrencyReadingService
    {
        private readonly MoneyExchangeDbContext _context;

        public CurrencyReadingService(MoneyExchangeDbContext context)
        {
            _context = context;
        }

        public async Task<string[]> GetAvailableCurrenciesAsync()
        {
            var availableCurrencies = await _context.CurrencySymbols.AsNoTracking()
                .Where(x => x.Enabled).Select(x => x.Symbol).ToArrayAsync();
            
            return availableCurrencies;
        }
    }
}
