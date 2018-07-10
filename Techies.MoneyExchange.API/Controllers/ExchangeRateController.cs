using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Techies.MoneyExchange.Application.ExchangeRate;
using Techies.MoneyExchange.DTOs.Request;

namespace Techies.MoneyExchange.API.Controllers
{
    [Produces("application/json")]
    [Route("api/exchangerate")]
    public class ExchangeRateController : Controller
    {
        private readonly ExchangeRateReadingService _exchangeRateReadingService;
        private readonly ExchangeRateWriteService _exchangeRateWriteService;

        public ExchangeRateController(
            ExchangeRateReadingService exchangeRateReadingService,
            ExchangeRateWriteService exchangeRateWriteService)
        {
            _exchangeRateReadingService = exchangeRateReadingService;
            _exchangeRateWriteService = exchangeRateWriteService;
        }

        [Route("latest")]
        [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 10 * 60)]
        public async Task<IActionResult> GetLatest(string @base,string[] symbols)
        {
            var rate = await _exchangeRateReadingService.GetRatesAsync(@base,symbols);
            return Ok(rate);
        }

        public async Task<IActionResult> Post([FromBody]RegisterExchangeRateRequest request)
        {
            var response = await _exchangeRateWriteService.RegisterExchangeRate(request);

            if (response.Success) return Ok();

            return BadRequest(response);
        }
    }
}