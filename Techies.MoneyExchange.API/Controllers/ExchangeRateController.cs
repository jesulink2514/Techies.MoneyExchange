using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Techies.MoneyExchange.Application.ExchangeRate;

namespace Techies.MoneyExchange.API.Controllers
{
    [Produces("application/json")]
    [Route("api/exchangerate")]
    public class ExchangeRateController : Controller
    {
        private readonly ExchangeRateReadingService _exchangeRateReadingService;

        public ExchangeRateController(ExchangeRateReadingService exchangeRateReadingService)
        {
            _exchangeRateReadingService = exchangeRateReadingService;
        }

        [Route("latest")]
        [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 10 * 60)]
        public async Task<IActionResult> GetLatest(string @base,string[] symbols)
        {
            var rate = await _exchangeRateReadingService.GetRatesAsync(@base,symbols);
            return Ok(rate);
        }
    }
}