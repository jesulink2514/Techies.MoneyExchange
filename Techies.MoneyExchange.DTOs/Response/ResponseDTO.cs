using System;
using System.Linq;

namespace Techies.MoneyExchange.DTOs.Response
{
    public class ResponseDTO
    {
        public ResponseDTO()
        {
            Messages = new string[] { };
        }
        public bool Success { get; set; }
        public string[] Messages { get; set; }
        public string RequestId { get; set; }
        public string Message => Messages.FirstOrDefault();

        public static ResponseDTO Ok()
        {
            return new ResponseDTO() { Success = true };
        }
        public static ResponseDTO Ok<T>(T data)
        {
            return new ResponseDTO<T>() { Success = true, Data = data };
        }
        public static ResponseDTO Fail(params string[] messages)
        {
            return new ResponseDTO() { Success = false, Messages = messages };
        }

        public static ResponseDTO FailWithRequestId(string requestId, string message)
        {
            return new ResponseDTO()
            {
                RequestId = requestId,
                Success = false,
                Messages = new[] { message }
            };
        }

        public static ResponseDTO Fail<T>(params string[] messages)
        {
            return new ResponseDTO<T>() { Success = false, Messages = messages };
        }

        public static implicit operator bool(ResponseDTO response)
        {
            return response.Success;
        }

        public static implicit operator ResponseDTO(bool success)
        {
            return new ResponseDTO() { Success = success };
        }
    }

    public class ResponseDTO<T> : ResponseDTO
    {
        public T Data { get; set; }
    }
}
