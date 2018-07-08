namespace Techies.MoneyExchange.Domain
{
    public class CurrencySymbol
    {
        protected CurrencySymbol()
        {
        }

        public CurrencySymbol(string symbol)
        {
            Symbol = symbol;
            Enabled = true;
        }

        public string Symbol { get; set; }
        public bool Enabled { get; set; }
    }
}
