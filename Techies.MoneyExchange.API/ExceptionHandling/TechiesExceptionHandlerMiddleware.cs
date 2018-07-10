using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Techies.MoneyExchange.DTOs.Response;

namespace Techies.MoneyExchange.API.ExceptionHandling
{
    public class TechiesExceptionHandlerMiddleware
    {

        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public TechiesExceptionHandlerMiddleware(RequestDelegate next,ILoggerFactory loggerFactory)
        {
            _next = next;
            _logger = loggerFactory.CreateLogger<TechiesExceptionHandlerMiddleware>();
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                try
                {
                    context.TraceIdentifier = Guid.NewGuid().ToString();
                    _logger.LogError(context.TraceIdentifier,ex);
                }
                catch (Exception ex2)
                {
                    _logger.LogError(0, ex2,"An exception was thrown attempting to execute the error handler.");
                }
            }

            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                context.TraceIdentifier = Guid.NewGuid().ToString();
                _logger.LogError(context.TraceIdentifier,ex, ex.Message);
                context.Response.StatusCode = 500;
            }

            if (!context.Response.HasStarted && context.Response.StatusCode != StatusCodes.Status204NoContent)
            {
                context.Response.ContentType = "application/json";

                ResponseDTO response;

                switch (context.Response.StatusCode)
                {
                    case 401:
                        response = ResponseDTO.Fail("User not authenticated");

                        break;
                    case 403:
                        response = ResponseDTO.Fail("User not authorized");
                        break;
                    default:
                        response = ResponseDTO.FailWithRequestId(context.TraceIdentifier,"An error has ocurred.");
                        break;
                }

                var json = JsonConvert.SerializeObject(response, new JsonSerializerSettings{ ContractResolver = new CamelCasePropertyNamesContractResolver() });
    
                await context.Response.WriteAsync(json);
            }
        }

    }
}
