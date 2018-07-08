﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Techies.MoneyExchange.Infrastructure.Persistence.EF.Core;

namespace Techies.MoneyExchange.Infrastructure.Migrations
{
    [DbContext(typeof(MoneyExchangeDbContext))]
    [Migration("20180708195212_FixingPrecision")]
    partial class FixingPrecision
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Techies.MoneyExchange.Domain.CurrencySymbol", b =>
                {
                    b.Property<string>("Symbol")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Enabled");

                    b.HasKey("Symbol");

                    b.ToTable("CurrencySymbols");
                });

            modelBuilder.Entity("Techies.MoneyExchange.Domain.ExchangeRate", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BaseSymbol")
                        .IsRequired()
                        .IsFixedLength(true)
                        .HasMaxLength(3)
                        .IsUnicode(false);

                    b.Property<decimal>("Rate")
                        .HasColumnType("decimal(12,6)");

                    b.Property<string>("TargetSymbol")
                        .IsRequired()
                        .IsFixedLength(true)
                        .HasMaxLength(3)
                        .IsUnicode(false);

                    b.Property<DateTime>("Timestamp");

                    b.HasKey("Id");

                    b.ToTable("ExchangeRates");
                });
#pragma warning restore 612, 618
        }
    }
}
