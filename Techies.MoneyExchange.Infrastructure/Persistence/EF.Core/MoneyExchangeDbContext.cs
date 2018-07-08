using Microsoft.EntityFrameworkCore;
using Techies.MoneyExchange.Domain;

namespace Techies.MoneyExchange.Infrastructure.Persistence.EF.Core
{
    public class MoneyExchangeDbContext: DbContext
    {
        public MoneyExchangeDbContext(DbContextOptions<MoneyExchangeDbContext> options)
            : base(options)
        {
        }
        public DbSet<CurrencySymbol> CurrencySymbols { get; protected set; }
        public DbSet<ExchangeRate> ExchangeRates { get; protected set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CurrencySymbol>()
                .ToTable("CurrencySymbols")
                .HasKey(x => x.Symbol);

            modelBuilder.Entity<ExchangeRate>()
                .ToTable("ExchangeRates")
                .HasKey(x => x.Id);

            modelBuilder.Entity<ExchangeRate>()
                .Property(x => x.Rate)
                .HasColumnType("decimal(12,6)")
                .IsRequired();

            modelBuilder.Entity<ExchangeRate>()
                .Property(x => x.BaseSymbol)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(3)
                .IsUnicode(false);

            modelBuilder.Entity<ExchangeRate>()
                .Property(x => x.TargetSymbol)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(3)
                .IsUnicode(false);

            modelBuilder.Entity<ExchangeRate>()
                .Property(x => x.Timestamp)
                .IsRequired();
        }
    }
}
