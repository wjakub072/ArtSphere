
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

        var artist = await _usersRepository.GetArtistAsync(User.Identity!.Name!);

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

        var artists = await _usersRepository.GetArtistAsync(User.Identity!.Name!);

        var offer = await _offersRepository.EditOffer(id, offerPayload);
        return new AddOfferResponse(
            true,
            "Zaktualizowano ofertę dzieła.",
            offer.Id,
            offer.ArtistId,
            offer.Title);
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
    [HttpGet("my")]
    public async Task<ActionResult<OfferListResponse[]>> GetMyOffersAsync(int PageSize, int Page)
    {
        if(User.Identity == null){
            return BadRequest(new { success = false, message = "Brak sesji użytkownika."});
        }

        var artist = await _usersRepository.GetArtistAsync(User.Identity!.Name!);

        var offers = await _offersRepository.GetArtistsOffers(artist.Id, PageSize, Page);
        return 
            offers.Select(o => 
                new OfferListResponse(
                    o.Id, 
                    o.ArtistId, 
                    string.Concat(artist.FirstName ?? string.Empty, " ", artist.LastName ?? string.Empty),
                    o.Title, 
                    o.Price, 
                    o.Archived,
                    o.IsAuction,
                    o.CompressedPicture))
                    .ToArray();
    }

    [HttpGet()]
    public async Task<ActionResult<OfferListResponse[]>> GetOffersAsync(
        string? Category,
        string? Technic,
        string? Title,
        string? Topic,
        string? Artist,
        decimal? PriceBottom,
        decimal? PriceTop,
        decimal? DimensionsXBottom,
        decimal? DimensionsXTop,
        decimal? DimensionsYBottom,
        decimal? DimensionsYTop,
        string[]? Tags,
        int PageSize,
        int Page)
    {
        var filtersPayload = new OfferFiltersPayload(){
            Category = Category,
            Technic = Technic,
            Title = Title,
            Topic = Topic,
            Artist = Artist,
            PriceBottom = PriceBottom,
            PriceTop = PriceTop,
            DimensionsXBottom = DimensionsXBottom,
            DimensionsXTop = DimensionsXTop,
            DimensionsYBottom = DimensionsYBottom,
            DimensionsYTop = DimensionsYTop,
            Tags = Tags, 
            PageSize = PageSize, 
            Page = Page
        };
        var offers = await _offersRepository.GetOffersAsync(filtersPayload);

        int[] userFavorites = Array.Empty<int>();

        if(User.Identity != null && !string.IsNullOrEmpty(User.Identity.Name))
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
                    o.IsAuction,
                    o.CompressedPicture,
                    userFavorites.Contains(o.Id)))
                    .ToArray();
    }

    [HttpGet("all")]
    public async Task<ActionResult<OfferListResponse[]>> GetOffersAsync()
    {
        var offers = await _offersRepository.GetOffersAsync();

        int[] userFavorites = Array.Empty<int>();

        if(User.Identity != null && !string.IsNullOrEmpty(User.Identity.Name))
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
                    o.IsAuction,
                    "Not included - we value your scrolling time :-)",
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