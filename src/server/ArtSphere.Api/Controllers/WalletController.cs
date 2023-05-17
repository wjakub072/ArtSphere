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
[Route("api/profile/wallet")]
public class WalletController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UsersRepository _usersRepository;
    private readonly FundsRepository _fundsRepository;

    public WalletController(UserManager<ApplicationUser> userManager, UsersRepository usersRepository, FundsRepository fundsRepository)
    {
        _userManager = userManager;
        _usersRepository = usersRepository;
        _fundsRepository = fundsRepository;
    }

    [Authorize]
    [HttpGet]
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


    [Authorize]
    [HttpGet("deposit")]
    public async Task<ActionResult<DepositInfoResponse>> GetDepositInfoAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(user?.AccountId != null)
        {
            var token = await _fundsRepository.CreateUserDepositTokenAsync((int)user?.AccountId!);
            return Ok(new DepositInfoResponse("PL82109024027867242714172776", "BIGBPLPW", "ArtSphere SA", "Warszawa ul. Solidarności 15a/24", $"{token.Value}"));
        }
        return BadRequest("Odnaleziony użytkownik nie posiada przypisanego konta.");
    }


    [Authorize]
    [HttpPost("deposit")]
    public async Task<ActionResult<DepositResultResponse>> DepositFundsAsync([FromBody] DepositPayload depositPayload)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(user?.AccountId != null)
        {
            var lastUserToken = await _fundsRepository.GetUserDepositTokenAsync((int)user?.AccountId!);

            if(lastUserToken == null){
                return BadRequest(new DepositResultResponse(false, "Nieudana próba depozytu, użytkownik nie posida wygenerowanego tokenu depozytu."));
            }

            if(lastUserToken.Value != depositPayload.Token){
                return BadRequest(new DepositResultResponse(false, "Nieudana próba depozytu, przekazany token różni się od najnowszego wygenerowanego tokenu."));
            }

            if(lastUserToken.ExpirationTime < DateTime.Now){
                return BadRequest(new DepositResultResponse(false, "Nieudana próba depozytu, token użytkownika wygasł."));
            }

            var balanceAfterDeposit = await _fundsRepository.ExecuteDepositAsync((int)user?.AccountId!, depositPayload.Amount);
            lastUserToken.Used = true;
            return Ok(new DepositResultResponse(true, "Wpłacono środki.", depositPayload.Amount, balanceAfterDeposit));
        }
        return BadRequest("Odnaleziony użytkownik nie posiada przypisanego konta.");
    }
}