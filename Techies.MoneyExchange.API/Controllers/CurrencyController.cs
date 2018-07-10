using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Techies.MoneyExchange.Application;
using Techies.MoneyExchange.Application.Currency;

namespace Techies.MoneyExchange.API.Controllers
{
    [Produces("application/json")]
    [Route("api/currency")]
    public class CurrencyController : Controller
    {
        private readonly CurrencyReadingService _service;

        public CurrencyController(CurrencyReadingService service)
        {
            _service = service;
        }

        [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 10 * 60)]
        public async Task<IActionResult> Get()
        {
            var currencies = await _service.GetAvailableCurrenciesAsync();
            return Ok(currencies);
        }
    }
}