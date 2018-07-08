using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Techies.MoneyExchange.Infrastructure.Persistence.EF.Core
{
    public class MoneyExchangeDbContextDesignFactory : IDesignTimeDbContextFactory<MoneyExchangeDbContext>
    {
        public MoneyExchangeDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MoneyExchangeDbContext>();
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Techies.MoneyExchange;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new MoneyExchangeDbContext(optionsBuilder.Options);
        }
    }
}
