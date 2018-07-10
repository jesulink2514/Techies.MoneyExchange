using System.Linq;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Techies.MoneyExchange.Application.Currency;
using Techies.MoneyExchange.Domain;

namespace Techies.MoneyExchange.Tests
{
    [TestClass]
    public class CurrencyReadingServiceTest : BaseEFTest
    {
        [TestMethod]
        public async Task GetAvailableCurrenciesReturnsEmptyArrayGivenNoCurrencyIsRegistered()
        {
            //Arrange
            var context = CreateEmptyContext();
            var service = new CurrencyReadingService(context);
            //Act
            var currencies = await service.GetAvailableCurrenciesAsync();

            //Assert
            Assert.IsNotNull(currencies);
            Assert.AreEqual(0,currencies.Length);
        }

        [TestMethod]
        public async Task GetAvailableCurrenciesReturnsEmptyArrayGivenNoCurrencyIsEnabled()
        {
            //Arrange
            var context = CreateEmptyContext();
            context.CurrencySymbols.Add(new CurrencySymbol("USD") {Enabled = false});
            await context.SaveChangesAsync();
            
            var service = new CurrencyReadingService(context);
            //Act
            var currencies = await service.GetAvailableCurrenciesAsync();

            //Assert
            Assert.IsNotNull(currencies);
            Assert.AreEqual(0,currencies.Length);
        }

        [TestMethod]
        public async Task GetAvailableCurrenciesReturnsGivenCurrencyAreEnabled()
        {
            //Arrange
            var context = CreateEmptyContext();
            context.CurrencySymbols.Add(new CurrencySymbol("USD"));
            context.CurrencySymbols.Add(new CurrencySymbol("EUR"));
            await context.SaveChangesAsync();
            
            var service = new CurrencyReadingService(context);
            
            //Act
            var currencies = await service.GetAvailableCurrenciesAsync();

            //Assert
            Assert.IsNotNull(currencies);
            Assert.AreEqual(2,currencies.Length);
            Assert.IsTrue(currencies.Contains("USD"));
            Assert.IsTrue(currencies.Contains("EUR"));
        }
    }
}
