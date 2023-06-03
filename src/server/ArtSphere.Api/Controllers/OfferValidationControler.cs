using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;


[ApiController]
[Route("api/offers")]
public class OfferValidationController : ControllerBase
{
    private readonly OffersRepository _offersRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UsersRepository _usersRepository;

    public OfferValidationController(OffersRepository offersRepository, UserManager<ApplicationUser> userManager, UsersRepository usersRepository)
    {
        _offersRepository = offersRepository;
        _userManager = userManager;
        _usersRepository = usersRepository;
    }

    [Authorize("IsAdmin")]
    [HttpPost("{offerId}/validate")]
    public async Task<ActionResult> ValidateOfferAsync([FromRoute] int offerId, [FromBody] ValidationPayload payload)
    {
        if(User.Identity == null) {
            return BadRequest(new { success = false, message = "Błąd sesji użytkownika."});
        }

        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(await _userManager.IsInRoleAsync(user, "administrator")){
            if(await _offersRepository.OfferExists(offerId)){
                if(await _offersRepository.ValidateOffer(offerId, payload.Result)){

                    return Ok(new { success = true, message = "Oferta została potwierdzona w procesie walidacji."});
                }

                return Ok(new { success = false, message = "Oferta jest już zwalidowana."});
            }
            
            return BadRequest(new { success = false, message = "Oferta nie została odnaleziona."});       
        }

        return BadRequest(new { success = false, message = "Błąd autoryzacji użytkownika."});       
    }

    [Authorize("IsAdmin")]
    [HttpGet("validate")]
    public async Task<ActionResult<OfferToValidateResponse>> GetLastToValidation()
    {
        if(User.Identity == null) {
            return BadRequest(new { success = false, message = "Błąd sesji użytkownika."});
        }

        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(await _userManager.IsInRoleAsync(user, "administrator"))
        {
            var lastOffer = await _offersRepository.GetOfferToValidateAsync();
            if(lastOffer == null)
            {
                return Ok(new {success = true, message = "Brak ofert do walidacji."});
            }

            return Ok(new OfferToValidateResponse(
                    lastOffer.Id, 
                    lastOffer.ArtistId, 
                    string.Concat(lastOffer.Artist?.FirstName ?? string.Empty, " ", lastOffer.Artist?.LastName ?? string.Empty),
                    lastOffer.Title, 
                    lastOffer.Description ?? string.Empty,
                    lastOffer.Price, 
                    lastOffer.IsAuction,
                    lastOffer.AuctionEndTime,
                    lastOffer.DimensionsX, 
                    lastOffer.DimensionsY,
                    lastOffer.Archived,
                    lastOffer.CompressedPicture,
                    lastOffer.Tags.Select(t => t.Name).ToArray()));
        }

        return BadRequest(new { success = false, message = "Błąd autoryzacji użytkownika."});   
    }
}