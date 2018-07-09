namespace Techies.MoneyExchange.DTOs.Request
{
    public class RegisterExchangeRateRequest
    {
        public string Base { get; set; }
        public string Target { get; set; }
        public decimal Rate { get; set; }
        public string UserId { get; set; }
    }
}