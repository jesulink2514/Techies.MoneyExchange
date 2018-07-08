using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Techies.MoneyExchange.Infrastructure.Migrations
{
    public partial class InitialDbSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CurrencySymbols",
                columns: table => new
                {
                    Symbol = table.Column<string>(nullable: false),
                    Enabled = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrencySymbols", x => x.Symbol);
                });

            migrationBuilder.CreateTable(
                name: "ExchangeRates",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    BaseSymbol = table.Column<string>(unicode: false, fixedLength: true, maxLength: 3, nullable: false),
                    TargetSymbol = table.Column<string>(unicode: false, fixedLength: true, maxLength: 3, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Rate = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExchangeRates", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrencySymbols");

            migrationBuilder.DropTable(
                name: "ExchangeRates");
        }
    }
}
