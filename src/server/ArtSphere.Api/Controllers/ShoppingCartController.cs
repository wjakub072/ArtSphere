using System.Collections.ObjectModel;
using ArtSphere.Api.Models;
using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using ArtSphere.Api.Validators;
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
    private readonly UsersRepository _usersRepository;

    public ShoppingCartController(ShoppingCartRepository shoppingCartRepository, UserManager<ApplicationUser> userManager, OffersRepository offersRepository, FundsRepository fundsRepository, OffersRepository offerRepository, UsersRepository usersRepository)
    {
        _shoppingCartRepository = shoppingCartRepository;
        _userManager = userManager;
        _offersRepository = offersRepository;
        _fundsRepository = fundsRepository;
        _offerRepository = offerRepository;
        _usersRepository = usersRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<ShoppingCartElementResponse[]>> GetUserCartAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User!.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var usersShoppingCartElements = await _shoppingCartRepository.GetUserShoppingCartElements((int)user!.AccountId);

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
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity!.Name!);

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
    [HttpGet("any")]
    public async Task<ActionResult> AnyUserShoppingCartElementsAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            return Ok(new { AnyCartElements = await _shoppingCartRepository.AnyUserShoppingCartElements(user.AccountId)});
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpPost("{offerId}")]
    public async Task<ActionResult> AddOfferToUserShoppingCart([FromRoute] int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            if(await _offersRepository.OfferExists(offerId) == false)
                return BadRequest(new { success = false, message = "Określona oferta nie została odnaleziona."});
            
            if(await _offersRepository.IsOfferAnAuction(offerId) == true)
                return BadRequest(new { success = false, message = "Określona oferta jest licytacją."});
            
            if(await _shoppingCartRepository.OfferExistsInUserShoppingCart(user.AccountId, offerId)){
                return BadRequest(new { success = false, message = "Ofera już znajduje się w koszu zakupowym użytkownika."});
            }

            await _shoppingCartRepository.AddOfferToUserShoppingCartAsync((int)user!.AccountId, offerId);

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
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            await _shoppingCartRepository.DeleteOfferFromUserShoppingCartAsync((int)user!.AccountId, offerId);

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
        ApplicationUser? user = await _userManager.FindByNameAsync(User!.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var usersShoppingCartElements = await _shoppingCartRepository.GetUserShoppingCartElements((int)user!.AccountId);

            if(!usersShoppingCartElements.Any())
            {
                return BadRequest(new OrderResponse(false, "Koszyk użytkownika jest pusty, nie można dokonać zamówienia."));
            }

            var finalCost = usersShoppingCartElements.Sum(c => c.Offer.Price);
            if(orderPayload.PaymentMethod == 1)
            {
                if(!await _fundsRepository.CheckFundsAmount(user.AccountId, finalCost))
                {
                    return BadRequest(new OrderResponse(false, "Niewystarczająca ilość środków w portfelu użytkownika."));
                }
            }    

            var account = await _usersRepository.GetUserAsync(user.AccountId);
            var result = PropertyNullOrEmptyValidator.Validate<User>(account, "Address", "Company");
            if(result.Success == false){
                if(result.InvalidProperties.Contains("AddressApartment")){
                    result.InvalidProperties.Remove("AddressApartment");
                }
                if(result.InvalidProperties.Any()){
                    return BadRequest(new OrderResponse(false, 
                    string.Concat("Brak możliwości wykonania zamówienia przez braki w adresie użytkownika: ", 
                    string.Join(", ", result.InvalidProperties))));
                }
            }

            var order = new Order(){
                UserId = user.AccountId,
                Amount = finalCost,

                PaymentMethod = orderPayload.PaymentMethod,
                AddressCity = account.AddressCity ?? string.Empty,
                AddressCountry = account.AddressCountry ?? string.Empty,
                AddressApartment = account.AddressApartment ?? string.Empty,
                AddressBuilding = account.AddressBuilding ?? string.Empty,
                AddressPostalCode = account.AddressPostalCode ?? string.Empty,
                AddressStreet = account.AddressStreet ?? string.Empty,
                ExecutionDate = DateTime.Now,
                IsInvoice = orderPayload.Invoice,
                Elements = new Collection<OrderElement>()
            };
            if(order.IsInvoice){
                // validate 
                result = PropertyNullOrEmptyValidator.Validate<User>(account, "CompanyAddress");
                if(result.Success == false){
                if(result.InvalidProperties.Contains("CompanyAddressApartment")){
                    result.InvalidProperties.Remove("CompanyAddressApartment");
                }
                if(result.InvalidProperties.Any()){
                    return BadRequest(new OrderResponse(false, 
                    string.Concat("Brak możliwości wykonania zamówienia przez braki w adresie firmy: ", 
                    string.Join(", ", result.InvalidProperties))));
                }
            }
                order.CompanyAddressCity = account.CompanyAddressCity;
                order.CompanyAddressBuilding = account.CompanyAddressBuilding;
                order.CompanyAddressApartment = account.CompanyAddressApartment;
                order.CompanyAddressCountry = account.CompanyAddressCountry;
                order.CompanyAddressPostalCode = account.CompanyAddressPostalCode;
                order.CompanyAddressStreet = account.CompanyAddressStreet;
            }
            foreach(var cartElement in usersShoppingCartElements){
                order.Elements.Add(new OrderElement(){
                    OfferId = cartElement.OfferId,
                    Amount = cartElement.Offer.Price
                });
            }
            var balance = await _shoppingCartRepository.PlaceShoppingOrderAsync(order);

            foreach (var cartElement in usersShoppingCartElements)
            {
                await _offerRepository.SoldOffer(cartElement.OfferId);
            }
            return Ok(new OrderResponse(true, "Zamówienie zostało oddane do realizacji.", balance));
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }
}