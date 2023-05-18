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
        if(depositPayload.Amount < 10.0m) return BadRequest(new WithdrawResultResponse(false, "Minimalną kwotą wpłaty jest 10.0 PLN."));

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

            var balanceAfterDeposit = await _fundsRepository.ExecuteDepositAsync(lastUserToken, depositPayload.Amount);
            
            return Ok(new DepositResultResponse(true, "Wpłacono środki.", depositPayload.Amount, balanceAfterDeposit));
        }
        return BadRequest("Odnaleziony użytkownik nie posiada przypisanego konta.");
    }

    [Authorize]
    [HttpPost("withdraw")]
    public async Task<ActionResult<WithdrawResultResponse>> WithdrawFundsAsync([FromBody] WithdrawPayload withdrawPayload)
    {
        if(withdrawPayload.Amount < 10.0m){
            return BadRequest(new WithdrawResultResponse(false, "Minimalną kwotą wypłaty jest 10.0 PLN."));
        } 
        
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(user?.AccountId != null)
        {
            if(await _userManager.CheckPasswordAsync(user, withdrawPayload.PasswordConfirmation) == false){
                return new WithdrawResultResponse(false, "Podano błędne hasło użytkownika, autoryzacja wypłaty odrzucona.");
            }

            if(await _fundsRepository.CheckFundsAmount(user.AccountId, withdrawPayload.Amount))
            {
                var balanceAfterWithdraw = await _fundsRepository.ExecuteWithdrawAsync(user.AccountId, withdrawPayload.Amount);    

                return Ok(new WithdrawResultResponse(true, "Środki zostały przekazane do wypłaty na wskazane konto.", withdrawPayload.Amount, balanceAfterWithdraw));
            }else {
                return BadRequest(new WithdrawResultResponse(false, "Niewystarczająca ilość środków w portfelu."));
            }
        }
        return BadRequest("Odnaleziony użytkownik nie posiada przypisanego konta.");
    }
}