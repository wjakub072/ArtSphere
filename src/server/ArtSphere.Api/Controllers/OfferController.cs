
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
public class OfferController : ControllerBase
{
    private readonly OffersRepository _offersRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UsersRepository _usersRepository;


    public OfferController(OffersRepository offersRepository, UsersRepository usersRepository, UserManager<ApplicationUser> userManager)
    {
        _offersRepository = offersRepository;
        _usersRepository = usersRepository;
        _userManager = userManager;
    }

    [Authorize]
    [HttpPost()]
    public async Task<ActionResult<AddOfferResponse>> AddOfferAsync([FromBody] OfferPayload offerPayload)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var artist = await _usersRepository.GetArtistAsync(User.Identity.Name);

        var createdOffer = await _offersRepository.AddOffer(artist.Id, offerPayload);
        return new AddOfferResponse(
            true,
            "Utworzono ofertę dzieła.",
            createdOffer.Id,
            createdOffer.ArtistId,
            createdOffer.Title);
    }

    [Authorize]
    [HttpPost("{id}")]
    public async Task<ActionResult<AddOfferResponse>> EditOfferAsync([FromRoute] int id, [FromBody] OfferPayload offerPayload)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var artists = await _usersRepository.GetArtistAsync(User.Identity.Name);

        var offer = await _offersRepository.EditOffer(id, offerPayload);
        return new AddOfferResponse(
            true,
            "Zaktualizowano ofertę dzieła.",
            offer.Id,
            offer.ArtistId,
            offer.Title);
    }

    [Authorize("IsAdmin")]
    [HttpPost("{offerId}/validate")]
    public async Task<ActionResult> ValidateOfferAsync([FromRoute] int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");

        if(await _userManager.IsInRoleAsync(user, "administrator")){
            if(await _offersRepository.OfferExists(offerId)){
                if(await _offersRepository.ValidateOffer(offerId)){

                    return Ok(new { success = true, message = "Oferta została potwierdzona w procesie walidacji."});
                }

                return Ok(new { success = false, message = "Oferta jest już zwalidowana."});
            }
            
            return BadRequest(new { success = false, message = "Oferta nie została odnaleziona."});       
        }

        return BadRequest(new { success = false, message = "Błąd autoryzacji użytkownika."});       
    }

    [Authorize]
    [HttpPut("{offerId}/fav")]
    public async Task<ActionResult> AddOfferToFavoritesAsync([FromRoute] int offerId)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

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
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

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
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

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
    [HttpDelete("{id}")]
    public async Task<ActionResult<DeleteOfferResponse>> DeleteOfferAsync([FromBody] DeleteOfferPayload deleteOfferPayload)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var artists = await _usersRepository.GetArtistAsync(User.Identity.Name);

        if(deleteOfferPayload.Archive)
        {
            var archived = await _offersRepository.ArchiveOffer(deleteOfferPayload.OfferId);
            return new DeleteOfferResponse(true, "Pomyślnie zarchiwizowano ofertę.", archived.Title);
        }
        else 
        {
            await _offersRepository.DeleteOffer(deleteOfferPayload.OfferId);
            return new DeleteOfferResponse(true, "Pomyślnie usunięto ofertę.");
        }
    }

    [Authorize]
    [HttpGet("fav")]
    public async Task<ActionResult<OfferListResponse[]>> GetMyFavoriteOffersAsync()
    {
        var user = await _usersRepository.GetArtistAsync(User.Identity.Name);

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

    [Authorize]
    [HttpGet("my")]
    public async Task<ActionResult<OfferListResponse[]>> GetMyOffersAsync()
    {
        var artist = await _usersRepository.GetArtistAsync(User.Identity.Name);

        var offers = await _offersRepository.GetArtistsOffers(artist.Id);
        return 
            offers.Select(o => 
                new OfferListResponse(
                    o.Id, 
                    o.ArtistId, 
                    string.Concat(artist.FirstName ?? string.Empty, " ", artist.LastName ?? string.Empty),
                    o.Title, 
                    o.Price, 
                    o.Archived,
                    o.CompressedPicture))
                    .ToArray();
    }

    [HttpGet()]
    public async Task<ActionResult<OfferListResponse[]>> GetOffersAsync()
    {
        var offers = await _offersRepository.GetOffersAsync();

        int[] userFavorites = Array.Empty<int>();

        if(!string.IsNullOrEmpty(User.Identity.Name))
        {
            ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user != null){

                if(user?.AccountId != null) {

                    userFavorites = await _offersRepository.GetUserFavoriteOffersId(user.AccountId);
                }
            }
        }

        return 
            offers.Select(o => 
                new OfferListResponse(
                    o.Id, 
                    o.ArtistId, 
                    string.Concat(o.Artist?.FirstName ?? string.Empty, " ", o.Artist?.LastName ?? string.Empty),
                    o.Title, 
                    o.Price, 
                    o.Archived,
                    o.CompressedPicture,
                    userFavorites.Contains(o.Id)))
                    .ToArray();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OfferDetailsResponse>> GetOfferDescriptionAsync(int id)
    {
        var offer = await _offersRepository.GetOfferAsync(id);
        return new OfferDetailsResponse(
            offer.Id,
            offer.ArtistId,
            string.Concat(offer.Artist?.FirstName ?? string.Empty, " ", offer.Artist?.LastName ?? string.Empty),
            offer.Category,
            offer.Technic,
            offer.Topic,
            offer.Description,
            offer.DimensionsX,
            offer.DimensionsY,
            offer.Unit,
            offer.Title,
            offer.Price,
            offer.Archived,
            offer.Picture,
            offer.Tags?.Select(o => o.Name).ToArray()
        );
    }
}