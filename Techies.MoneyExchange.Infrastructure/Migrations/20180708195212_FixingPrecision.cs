using Microsoft.EntityFrameworkCore.Migrations;

namespace Techies.MoneyExchange.Infrastructure.Migrations
{
    public partial class FixingPrecision : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Rate",
                table: "ExchangeRates",
                type: "decimal(12,6)",
                nullable: false,
                oldClrType: typeof(decimal));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Rate",
                table: "ExchangeRates",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12,6)");
        }
    }
}
