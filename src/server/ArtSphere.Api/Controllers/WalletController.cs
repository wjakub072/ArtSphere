using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/profile/wallet")]
public class WalletController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UsersRepository _usersRepository;

    public WalletController(UserManager<ApplicationUser> userManager, UsersRepository usersRepository)
    {
        _userManager = userManager;
        _usersRepository = usersRepository;
    }

    public async Task<ActionResult<WalletResponse>> GetUserBalanceAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var account = await _usersRepository.GetUserWithWalletAsync(user.AccountId);

            return Ok(new WalletResponse(
                account.Wallet.Balance,
                account.Wallet.LastUpdated
            ));
        }
        return BadRequest("Odnaleziony użytkownik nie posiada przypisanego konta.");
    }
}