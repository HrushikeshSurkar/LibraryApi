using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

public class GlobalExceptionHandler : IExceptionHandler
{
  public async ValueTask<bool> TryHandleAsync(
    HttpContext httpContext, Exception exception, CancellationToken cancellationToken
  )
  {

    var errorResponse = new
    {
      Error = exception.Message,
      Success = false
    };

    httpContext.Response.StatusCode = 500;
    httpContext.Response.ContentType = "application/json";

    await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);
    return true;

  }
}