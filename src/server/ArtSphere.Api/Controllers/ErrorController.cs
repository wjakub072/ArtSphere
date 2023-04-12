using ArtSphere.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;

[AllowAnonymous]
[ApiController]
public class ErrorController : ControllerBase
{
    [Route("/api/error-dev")]
    public IActionResult ErrorLocalDevelopment(
        [FromServices] IWebHostEnvironment webHostEnvironment)
    {
        if (webHostEnvironment.IsProduction())
        {
            throw new InvalidOperationException(
                "This shouldn't be invoked in non-development environments.");
        }

        IExceptionHandlerFeature? context =
            HttpContext.Features.Get<IExceptionHandlerFeature>();

        if (context == null) return Problem();

        Exception error = context.Error.GetBaseException();

        string? detail = null;
        string[]? trace = error.StackTrace?.Split(
            Environment.NewLine,
            StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

        if (trace?.Length > 0) detail = trace[1];

        return Problem(
            detail: detail,
            title: error.GetBaseException().Message);
    }

    [Route("/api/error")]
    public IActionResult Error()
    {
        IExceptionHandlerFeature? context =
            HttpContext.Features.Get<IExceptionHandlerFeature>();

        if (context == null) return Problem();

        Exception error = context.Error.GetBaseException();
        IActionResult problem = error switch
        {
            EndUserException => Problem(title: error.Message),
            _ => Problem(),
        };

        return problem;
    }
}