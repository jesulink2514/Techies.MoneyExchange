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
            if(request.Target == request.Base) return ResponseDTO.Fail("Base and target currency can't be the same.");

            var baseCurrency = await _context.CurrencySymbols.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Symbol == request.Base);

            var targetCurrency = await _context.CurrencySymbols.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Symbol == request.Target);

            var currencyExistAndIsEnabled = CurrencyExistAndIsEnabled(baseCurrency,request.Base);
            if (!currencyExistAndIsEnabled) return currencyExistAndIsEnabled;

            var targetCurrencyExist = CurrencyExistAndIsEnabled(targetCurrency,request.Target);
            if (!targetCurrencyExist) return targetCurrencyExist;

            var exchangeRate = new Domain.ExchangeRate(request.Base, request.Target, request.Rate);
            _context.ExchangeRates.Add(exchangeRate);
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
