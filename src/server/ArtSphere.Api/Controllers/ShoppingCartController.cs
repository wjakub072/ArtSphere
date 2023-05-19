using System.Collections.ObjectModel;
using ArtSphere.Api.Models;
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
[Route("api/profile/cart")]
public class ShoppingCartController : ControllerBase
{
    private readonly ShoppingCartRepository _shoppingCartRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly OffersRepository _offersRepository;
    private readonly FundsRepository _fundsRepository;
    private readonly OffersRepository _offerRepository;

    public ShoppingCartController(ShoppingCartRepository shoppingCartRepository, UserManager<ApplicationUser> userManager, OffersRepository offersRepository, FundsRepository fundsRepository, OffersRepository offerRepository)
    {
        _shoppingCartRepository = shoppingCartRepository;
        _userManager = userManager;
        _offersRepository = offersRepository;
        _fundsRepository = fundsRepository;
        _offerRepository = offerRepository;
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
                                    e.OfferId,
                                    string.Concat(e.Offer.Artist.FirstName ?? string.Empty, " ", e.Offer.Artist.LastName ?? string.Empty),
                                    e.Offer.ArtistId,
                                    e.Offer.Price,
                                    e.Offer.CompressedPicture ?? string.Empty
                                )
                            )
                    .ToArray());
            } else {
                return Ok(Array.Empty<ShoppingCartElementResponse>());
            }
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpGet("sum")]
    public async Task<ActionResult> GetUserCartSumAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var usersShoppingCartElements = await _shoppingCartRepository.GetUserShoppingCartElements(user.AccountId);
            if(usersShoppingCartElements.Any()){
                return Ok(new { NumberOfOffers = usersShoppingCartElements.Count(), SumOfPrices = usersShoppingCartElements.Sum(c => c.Offer.Price)});
            } else {
                return Ok(new { NumberOfOffers = 0, SumOfPrices = decimal.Zero});
            }
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }


    [Authorize]
    [HttpPost("{offerId}")]
    public async Task<ActionResult> AddOfferToUserShoppingCart([FromRoute] int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            if(!(await _offersRepository.OfferExists(offerId))){
                return BadRequest(new { success = false, message = "Określona oferta nie została odnaleziona."});
            }

            await _shoppingCartRepository.AddOfferToUserShoppingCartAsync((int)user?.AccountId, offerId);

            return Ok(new {
                success = true,
                message = "Oferta została dodana do koszyka zakupowego."
            });
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpDelete("{offerId}")]
    public async Task<ActionResult<DeleteOfferResponse>> DeleteOfferFromUserCart(int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            await _shoppingCartRepository.DeleteOfferFromUserShoppingCartAsync((int)user?.AccountId, offerId);

            return Ok(new DeleteOfferResponse(
                true,
                "Oferta została usunięta z koszyka zakupowego."
            ));
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpPost("execute")]
    public async Task<ActionResult<OrderResponse>> ExecuteShoppingCartOrderAsync([FromBody] OrderPayload orderPayload)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var usersShoppingCartElements = await _shoppingCartRepository.GetUserShoppingCartElements((int)user?.AccountId);

            if(!usersShoppingCartElements.Any())
            {
                return BadRequest(new OrderResponse(false, "Koszyk użytkownika jest pusty, nie można dokonać zamówienia."));
            }

            var finalCost = usersShoppingCartElements.Sum(c => c.Offer.Price);
            if(!await _fundsRepository.CheckFundsAmount(user.AccountId, finalCost))
            {
                return BadRequest(new OrderResponse(false, "Niewystarczająca ilość środków w portfelu użytkownika."));
            }

            var order = new Order(){
                UserId = user.AccountId,
                Amount = finalCost,
                PaymentMethod = orderPayload.PaymentMethod,
                AddressCity = orderPayload.AddressCity,
                AddressCountry = orderPayload.AddressCountry,
                AddressApartment = orderPayload.AddressApartment,
                AddressBuilding = orderPayload.AddressBuilding,
                AddressPostalCode = orderPayload.AddressPostalCode,
                AddressStreet = orderPayload.AddressStreet,
                Elements = new Collection<OrderElement>()
            };
            foreach(var cartElement in usersShoppingCartElements){
                order.Elements.Add(new OrderElement(){
                    OfferId = cartElement.OfferId,
                    Amount = cartElement.Offer.Price
                });
            }
            var balance = await _shoppingCartRepository.PlaceShoppingOrderAsync(order);

            foreach (var cartElement in usersShoppingCartElements)
            {
                await _offerRepository.ArchiveOffer(cartElement.OfferId);
            }
            return Ok(new OrderResponse(true, "Zamówienie zostało oddane do realizacji.", balance));
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }
}