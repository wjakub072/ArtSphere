using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UsersRepository _usersRepository;

    public AccountController(UserManager<ApplicationUser> userManager, UsersRepository usersRepository)
    {
        _userManager = userManager;
        _usersRepository = usersRepository;
    }

    [Authorize]
    [HttpDelete("delete")]
    public async Task<ActionResult> DeleteUserAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            await _usersRepository.DeleteUserAsync(user.AccountId);
        }

        await _userManager.DeleteAsync(user);
        return Ok();
    }

    [Authorize]
    [HttpPost("reset-password")]
    public async Task<ActionResult<PasswordChangeResult>> ResetPasswordAsync([FromBody] ResetPasswordPayload payload)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        if(User.Identity?.Name != payload.EmailOrUsername) return BadRequest(new { message = "Podano błędny email użytkownika"});

        var user = await _userManager.FindByEmailAsync(payload.EmailOrUsername) 
                   ?? await _userManager.FindByNameAsync(payload.EmailOrUsername);

        if (user == null) return BadRequest(new { message = "Nie odnaleziono użytkownika o podanym emailu." });
        var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

        var result = await _userManager.ResetPasswordAsync(user, resetToken, payload.NewPassword);

        if (result.Succeeded)
        {
            return Ok(new PasswordChangeResult (true, "Hasło zostało zaktualizowane."));
        }
        else
        {
            return BadRequest(new PasswordChangeResult (false, "Nie udało się zaktualizować hasła."));
        }
    }
}