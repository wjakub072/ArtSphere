using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/offers")]
public class BidController : ControllerBase
{
    private readonly OffersRepository _offersRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UsersRepository _usersRepository;
    private readonly BidsRepository _bidsRepository;
    private readonly FundsRepository _fundsRepository;

    public BidController(OffersRepository offersRepository, UserManager<ApplicationUser> userManager, UsersRepository usersRepository, BidsRepository bidsRepository, FundsRepository fundsRepository)
    {
        _offersRepository = offersRepository;
        _userManager = userManager;
        _usersRepository = usersRepository;
        _bidsRepository = bidsRepository;
        _fundsRepository = fundsRepository;
    }

    //TODO IMPLEMENT HIGHEST BID IN SELECTING ANY AUCTIONS, CREATE REMOVE BID REQUEST

    [Authorize]
    [HttpPost("{offerId}/bid")]
    public async Task<ActionResult> BidOfferAsync([FromRoute] int offerId, [FromBody] BidOfferPayload bidPayload)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(user?.AccountId != null)
        {
            if(await _offersRepository.OfferExists(offerId) == false)
                return BadRequest(new { success = false, message = "Oferta o podanym id nie została odnaleziona."});

            if(await _fundsRepository.CheckFundsAmount(user.AccountId, bidPayload.Amount) == false)
                return BadRequest(new { success = false, message = "Niewystarczająca ilość środków w portfelu!"});

            if(await _bidsRepository.CheckIfHigherBid(offerId, bidPayload.Amount)){
                
                await _bidsRepository.PlaceBid(offerId, user!.AccountId, bidPayload.Amount);

                return Ok(new { success = true, message = "Dodano licytacje danej oferty."});
            } else {
                return BadRequest(new { success = false, message = "Kwota nie przewyższa najwyższej licytacji oferty."});
            }
        }
        
        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }
}