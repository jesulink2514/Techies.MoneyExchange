using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Techies.MoneyExchange.Application.ExchangeRate;
using Techies.MoneyExchange.Domain;
using Techies.MoneyExchange.DTOs.Request;

namespace Techies.MoneyExchange.Tests
{
    [TestClass]
    public class ExchangeRateWriteServiceTests : BaseEFTest
    {
        [TestMethod]
        public async Task RegisterExchangeRateReturnsSuccessFalseGivenBaseCurrencyDoesntExist()
        {
            //Arrange
            var context = CreateEmptyContext();
            var request = new RegisterExchangeRateRequest();
            var appService = new ExchangeRateWriteService(context);
            //Act
            var response = await appService.RegisterExchangeRate(request);

            //Assert
            Assert.IsNotNull(response);
            Assert.IsFalse(response.Success);
        }

        [TestMethod]
        public async Task RegisterExchangeRateReturnsSuccessFalseGivenTargetCurrencyDoesntExist()
        {
            //Arrange
            var context = CreateEmptyContext();
            context.CurrencySymbols.Add(new CurrencySymbol("USD"));
            await context.SaveChangesAsync();
            
            var appService = new ExchangeRateWriteService(context);
            var request = new RegisterExchangeRateRequest()
            {
                Base = "USD", Rate = 1.1m,Target = "EUR", UserId = "fake"
            };
            
            //Act
            var response = await appService.RegisterExchangeRate(request);

            //Assert
            Assert.IsNotNull(response);
            Assert.IsFalse(response.Success);
        }

        [TestMethod]
        public async Task RegisterExchangeRateReturnsSuccessFalseGivenBaseCurrencyIsDisabled()
        {
            //Arrange
            var context = CreateEmptyContext();
            context.CurrencySymbols.Add(new CurrencySymbol("USD"){Enabled = false});
            context.CurrencySymbols.Add(new CurrencySymbol("EUR"){Enabled = true});
            await context.SaveChangesAsync();
            
            var appService = new ExchangeRateWriteService(context);
            var request = new RegisterExchangeRateRequest()
            {
                Base = "USD", Rate = 1.1m,Target = "EUR", UserId = "fake"
            };
            
            //Act
            var response = await appService.RegisterExchangeRate(request);

            //Assert
            Assert.IsNotNull(response);
            Assert.IsFalse(response.Success);
        }

        [TestMethod]
        public async Task RegisterExchangeRateReturnsSuccessFalseGivenTargetCurrencyIsDisabled()
        {
            //Arrange
            var context = CreateEmptyContext();
            context.CurrencySymbols.Add(new CurrencySymbol("USD"){Enabled = true});
            context.CurrencySymbols.Add(new CurrencySymbol("EUR"){Enabled = false});
            await context.SaveChangesAsync();
            
            var appService = new ExchangeRateWriteService(context);
            var request = new RegisterExchangeRateRequest()
            {
                Base = "USD", Rate = 1.1m,Target = "EUR", UserId = "fake"
            };
            
            //Act
            var response = await appService.RegisterExchangeRate(request);

            //Assert
            Assert.IsNotNull(response);
            Assert.IsFalse(response.Success);
        }

        [TestMethod]
        public async Task RegisterExchangeRateReturnsSuccessFalseGivenBaseAndTargetAreTheSame()
        {
            //Arrange
            var context = CreateEmptyContext();
            context.CurrencySymbols.Add(new CurrencySymbol("USD"){Enabled = true});
            context.CurrencySymbols.Add(new CurrencySymbol("EUR"){Enabled = true});
            await context.SaveChangesAsync();
            
            var appService = new ExchangeRateWriteService(context);
            var request = new RegisterExchangeRateRequest()
            {
                Base = "USD", Rate = 1.1m,Target = "USD", UserId = "fake"
            };
            
            //Act
            var response = await appService.RegisterExchangeRate(request);

            //Assert
            Assert.IsNotNull(response);
            Assert.IsFalse(response.Success);
        }

        [TestMethod]
        public async Task RegisterExchangeRateReturnsSuccessTrueGivenValidRequest()
        {
            //Arrange
            const string baseCurrency = "USD";
            const string targetCurrency = "EUR";
            const decimal rate = 1.1m;
            var context = CreateEmptyContext();
            context.CurrencySymbols.Add(new CurrencySymbol(baseCurrency));
            context.CurrencySymbols.Add(new CurrencySymbol(targetCurrency));
            await context.SaveChangesAsync();
            
            var appService = new ExchangeRateWriteService(context);
            var request = new RegisterExchangeRateRequest()
            {
                Base = baseCurrency, Rate = rate,Target = targetCurrency, UserId = "fake"
            };
            
            //Act
            var response = await appService.RegisterExchangeRate(request);
            var exchangeRate = await context.ExchangeRates
                .FirstAsync(x => x.BaseSymbol == baseCurrency && x.TargetSymbol == targetCurrency);

            //Assert
            Assert.IsNotNull(response);
            Assert.IsTrue(response.Success);
            Assert.IsNotNull(exchangeRate);
            Assert.AreEqual(rate,exchangeRate.Rate);
        }
    }
}
