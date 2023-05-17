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

    public ShoppingCartController(ShoppingCartRepository shoppingCartRepository, UserManager<ApplicationUser> userManager)
    {
        _shoppingCartRepository = shoppingCartRepository;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<ShoppingCartElementResponse[]>> GetUserCartAsync(){
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var usersShoppingCartElements = await _shoppingCartRepository.GetUserShoppingCartElements((int)user?.AccountId);

            if(usersShoppingCartElements.Any()){
                return usersShoppingCartElements
                    .Select(
                        e => new ShoppingCartElementResponse
                                (   
                                    e.Offer.Title ?? string.Empty,
                                    string.Concat(e.Offer.Artist.FirstName ?? string.Empty, " ", e.Offer.Artist.LastName ?? string.Empty),
                                    e.Offer.CompressedPicture ?? string.Empty
                                )
                            )
                    .ToArray();
            }
        }

        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }

}