using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;


[Authorize]
[ApiController]
[Route("api/profile/cart")]
public class ShoppingCartController : ControllerBase
{
    private readonly ShoppingCartRepository _shoppingCartRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly OffersRepository _offersRepository;

    public ShoppingCartController(ShoppingCartRepository shoppingCartRepository, UserManager<ApplicationUser> userManager, OffersRepository offersRepository)
    {
        _shoppingCartRepository = shoppingCartRepository;
        _userManager = userManager;
        _offersRepository = offersRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<ShoppingCartElementResponse[]>> GetUserCartAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var usersShoppingCartElements = await _shoppingCartRepository.GetUserShoppingCartElements((int)user?.AccountId);

            if(usersShoppingCartElements.Any()){
                return Ok(usersShoppingCartElements
                    .Select(
                        e => new ShoppingCartElementResponse
                                (   
                                    e.Offer.Title ?? string.Empty,
                                    string.Concat(e.Offer.Artist.FirstName ?? string.Empty, " ", e.Offer.Artist.LastName ?? string.Empty),
                                    e.Offer.CompressedPicture ?? string.Empty
                                )
                            )
                    .ToArray());
            }
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }

    [HttpPost("{id}")]
    public async Task<ActionResult<DeleteOfferResponse>> AddOfferToUserShoppingCart(int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            if(!await _offersRepository.OfferExists(offerId)){
                return BadRequest(new { success = false, message = "Określona oferta nie została odnaleziona."});
            }

            await _shoppingCartRepository.AddOfferToUserShoppingCart((int)user?.AccountId, offerId);

            return Ok(new {
                success = true,
                message = "Oferta została dodana do koszyka zakupowego."
            });
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<DeleteOfferResponse>> DeleteOfferFromUserCart(int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            await _shoppingCartRepository.DeleteOfferFromUserShoppingCart((int)user?.AccountId, offerId);

            return Ok(new DeleteOfferResponse(
                true,
                "Oferta została usunięta z koszyka zakupowego."
            ));
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }
}