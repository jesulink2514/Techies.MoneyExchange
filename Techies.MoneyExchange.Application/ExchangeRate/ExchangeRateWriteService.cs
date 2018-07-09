using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Techies.MoneyExchange.Domain;
using Techies.MoneyExchange.DTOs.Request;
using Techies.MoneyExchange.DTOs.Response;
using Techies.MoneyExchange.Infrastructure.Persistence.EF.Core;

namespace Techies.MoneyExchange.Application.ExchangeRate
{
    public class ExchangeRateWriteService
    {
        private readonly MoneyExchangeDbContext _context;

        public ExchangeRateWriteService(MoneyExchangeDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseDTO> RegisterExchangeRate(RegisterExchangeRateRequest request)
        {
            var baseCurrency = await _context.CurrencySymbols.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Symbol == request.Base);

            var targetCurrency = await _context.CurrencySymbols.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Symbol == request.Base);

            var currencyExistAndIsEnabled = CurrencyExistAndIsEnabled(baseCurrency,request.Base);
            if (!currencyExistAndIsEnabled) return currencyExistAndIsEnabled;

            var targetCurrencyExist = CurrencyExistAndIsEnabled(targetCurrency,request.Target);
            if (targetCurrencyExist) return targetCurrencyExist;
            
            await _context.SaveChangesAsync();

            return ResponseDTO.Ok();
        }

        private static ResponseDTO CurrencyExistAndIsEnabled(CurrencySymbol currency, string symbol)
        {
            if (currency == null)
            {
                return ResponseDTO.Fail($"'{symbol}' currency is not registered.");
            }

            if (!currency.Enabled)
            {
                return ResponseDTO.Fail($"'{symbol}' currency is disabled.");
            }

            return true;
        }
    }
}
