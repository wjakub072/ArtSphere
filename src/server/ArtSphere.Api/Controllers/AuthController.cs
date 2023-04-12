using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserResponse>> SignInAsync(
        [FromBody] LoginCredentialsPayload credentials)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        UserResponse userResult = await _authService.SignInAsync(credentials);
        return Ok(userResult);
    }

    [HttpPost("logout")]
    public async Task<ActionResult> SignOutAsync()
    {
        await _authService.SignOutAsync();
        return Ok(new { message = "Wylogowano."});
    }

    [HttpPost("signup")]
    public async Task<ActionResult<SignUpResponse>> SignUpAsync(
        [FromBody] SignUpCredentialsPayload credentials)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        SignUpResponse userResult = await _authService.SignUpAsync(credentials);
        return Ok(userResult);
    }
}