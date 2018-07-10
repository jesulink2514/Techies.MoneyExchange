using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Techies.MoneyExchange.Application.ExchangeRate;
using Techies.MoneyExchange.Domain;

namespace Techies.MoneyExchange.Tests
{
    [TestClass]
    public class ExchangeRateReadingServiceTests : BaseEFTest
    {
        [TestMethod]
        public async Task GetRatesReturnsEmptyRateGivenNoRatesAreSetup()
        {
            //Arrange
            const string baseSymbol = "USD";
            const string targetSymbol = "EUR";
            var context = CreateEmptyContext();
            var service = new ExchangeRateReadingService(context);

            //Act
            var rates = await service.GetRatesAsync(baseSymbol, targetSymbol);

            //Assert
            Assert.IsNotNull(rates);
            Assert.IsNotNull(rates.Rates);
            Assert.AreEqual(baseSymbol,rates.BaseSymbol);
            Assert.AreEqual(1,rates.Rates.Count);
            Assert.IsTrue(rates.Rates.ContainsKey(targetSymbol));
            Assert.AreEqual(null,rates.Rates[targetSymbol]);
        }
        [TestMethod]
        public async Task GetRatesReturnsLatestAmountWhenMultipleRatesAreSetup()
        {
            //Arrange
            const string baseSymbol = "USD";
            const string targetSymbol = "EUR";
            const decimal oldRate = 1m;
            const decimal latestRate = 1.1m;

            var context = CreateEmptyContext();
            context.ExchangeRates.Add(new ExchangeRate(baseSymbol, targetSymbol, oldRate) {Id = Guid.NewGuid(), Timestamp = DateTime.UtcNow.AddHours(-1)});
            context.ExchangeRates.Add(new ExchangeRate(baseSymbol, targetSymbol, latestRate) {Id = Guid.NewGuid()});
            await context.SaveChangesAsync();

            var service = new ExchangeRateReadingService(context);
            
            //Act
            var rates = await service.GetRatesAsync(baseSymbol, targetSymbol);

            //Assert
            Assert.IsNotNull(rates);
            Assert.IsNotNull(rates.Rates);
            Assert.AreEqual(baseSymbol,rates.BaseSymbol);
            Assert.AreEqual(1,rates.Rates.Count);
            Assert.IsTrue(rates.Rates.ContainsKey(targetSymbol));
            Assert.AreEqual(latestRate,rates.Rates[targetSymbol]);
        }

        [TestMethod]
        public async Task GetRatesReturnsLatestAmountWhenJustOneRateIsSetup()
        {
            //Arrange
            const string baseSymbol = "USD";
            const string targetSymbol = "EUR";
            const decimal latestRate = 1.1m;

            var context = CreateEmptyContext();
            context.ExchangeRates.Add(new ExchangeRate(baseSymbol, targetSymbol, latestRate) {Id = Guid.NewGuid()});
            await context.SaveChangesAsync();

            var service = new ExchangeRateReadingService(context);
            
            //Act
            var rates = await service.GetRatesAsync(baseSymbol, targetSymbol);

            //Assert
            Assert.IsNotNull(rates);
            Assert.IsNotNull(rates.Rates);
            Assert.AreEqual(baseSymbol,rates.BaseSymbol);
            Assert.AreEqual(1,rates.Rates.Count);
            Assert.IsTrue(rates.Rates.ContainsKey(targetSymbol));
            Assert.AreEqual(latestRate,rates.Rates[targetSymbol]);
        }
    }
}
