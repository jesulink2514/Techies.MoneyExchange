using System;
using Microsoft.EntityFrameworkCore;
using Techies.MoneyExchange.Infrastructure.Persistence.EF.Core;

namespace Techies.MoneyExchange.Tests
{
    public class BaseEFTest
    {
        protected MoneyExchangeDbContext CreateEmptyContext()
        {
            var options = new DbContextOptionsBuilder<MoneyExchangeDbContext>()
                .UseInMemoryDatabase(databaseName: $"mock-{Guid.NewGuid()}.db")
                .Options;

            var context = new MoneyExchangeDbContext(options);
            return context;
        }
    }
}
