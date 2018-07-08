using System.Threading.Tasks;
using Refit;

namespace Techies.MoneyExchange.Infrastructure.ExternalServices
{
    /// <summary>
    /// Service to get rates from fixer.io
    /// </summary>
    public interface IFixerService
    {
        /// <summary>
        /// Get the current conversion rate for the currency base and the specified destination currency symbols 
        /// </summary>
        /// <param name="currencyBase">Currency base symbol ex. USD</param>
        /// <param name="toSymbols">Currencies to get rates ex. EUR</param>
        /// <returns></returns>
        [Get("/api/latest")]
        Task<FixerRateResponse> GetRateForAsync([Query("base")]string currencyBase, [Query("symbols")]params string[] toSymbols);
    }
}
