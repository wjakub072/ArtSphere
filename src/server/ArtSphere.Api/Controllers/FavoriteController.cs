using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/offers")]
public class FavoriteController : ControllerBase
{
    private readonly OffersRepository _offersRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UsersRepository _usersRepository;

    public FavoriteController(OffersRepository offersRepository, UserManager<ApplicationUser> userManager, UsersRepository usersRepository)
    {
        _offersRepository = offersRepository;
        _userManager = userManager;
        _usersRepository = usersRepository;
    }

    [Authorize]
    [HttpPut("{offerId}/fav")]
    public async Task<ActionResult> AddOfferToFavoritesAsync([FromRoute] int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(user?.AccountId != null)
        {
            if(await _offersRepository.OfferExists(offerId) == false)
                return BadRequest("Oferta o podanym id nie została odnaleziona.");

            if(await _offersRepository.DoesUserFavorOffer(user.AccountId, offerId) == false){
                await _offersRepository.AddOfferToFavorites(offerId, user.AccountId);
                return Ok("Dodano");
            }
        }
        
        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpGet("{offerId}/isfav")]
    public async Task<ActionResult> IsOfferUserFavoriteAsync([FromRoute] int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(user?.AccountId != null)
        {
            if(await _offersRepository.OfferExists(offerId) == false)
                return BadRequest("Oferta o podanym id nie została odnaleziona.");

            return Ok(await _offersRepository.DoesUserFavorOffer(user.AccountId, offerId));
        }
        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpDelete("{offerId}/fav")]
    public async Task<ActionResult> RemoveOfferFromFavoritesAsync([FromRoute] int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(user?.AccountId != null)
        {
            if(await _offersRepository.OfferExists(offerId) == false)
                return BadRequest("Oferta o podanym id nie została odnaleziona.");

            if(await _offersRepository.DoesUserFavorOffer(user.AccountId, offerId)){
                await _offersRepository.RemoveOfferFromFavorites(offerId, user.AccountId);
                return Ok("Usunieto");
            }
        }
        
        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }


    [Authorize]
    [HttpGet("fav")]
    public async Task<ActionResult<OfferListResponse[]>> GetMyFavoriteOffersAsync()
    {
        var user = await _usersRepository.GetArtistAsync(User.Identity!.Name!);

        var offers = await _offersRepository.GetUserFavoriteOffers(user.Id);
        return 
            offers.Select(o => 
                new OfferListResponse(
                    o.Id, 
                    o.ArtistId, 
                    string.Concat(user.FirstName ?? string.Empty, " ", user.LastName ?? string.Empty),
                    o.Title, 
                    o.Price, 
                    o.Archived,
                    o.CompressedPicture,
                    true))
                    .ToArray();
    }

}