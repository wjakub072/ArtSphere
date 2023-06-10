
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
    private readonly BidsRepository _bidsRepository;


    public OfferController(OffersRepository offersRepository, UsersRepository usersRepository, UserManager<ApplicationUser> userManager, BidsRepository bidsRepository)
    {
        _offersRepository = offersRepository;
        _usersRepository = usersRepository;
        _userManager = userManager;
        _bidsRepository = bidsRepository;
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
        var offer = await _offersRepository.GetOfferAsync(deleteOfferPayload.OfferId);
        
        if(offer.Sold)
            return BadRequest(new DeleteOfferResponse(false, "Nie można dokonać rządzania, oferta została już sprzedana."));

        if(deleteOfferPayload.Archive)
        {
            if(offer.Archived)
                return BadRequest(new DeleteOfferResponse(false, "Oferta jest już archiwalna."));
            
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

        foreach(var offer in offers.Where(o => o.IsAuction)){
            offer.Price =  await _bidsRepository.GetHighestOfferBid(offer.Id);
        }

        return 
            offers.Select(o => 
                new OfferListResponse(
                    o.Id, 
                    o.ArtistId, 
                    string.Concat(artist.FirstName ?? string.Empty, " ", artist.LastName ?? string.Empty),
                    o.Title, 
                    o.Price, 
                    o.Archived,
                    o.Sold,
                    o.IsAuction,
                    o.CompressedPicture))
                    .ToArray();
    }

    [HttpGet("latest")]
    public async Task<ActionResult<OfferListResponse[]>> GetLatestOffersAsync(string? type, int PageSize, int Page)
    {
        if(User.Identity == null){
            return BadRequest(new { success = false, message = "Brak sesji użytkownika."});
        }

        bool onlyAuctions = type == "auction";
        var offers = await _offersRepository.GetLatestOffers(onlyAuctions, PageSize, Page);

        if(onlyAuctions)
        {
            foreach(var offer in offers.Where(o => o.IsAuction)){
                offer.Price =  await _bidsRepository.GetHighestOfferBid(offer.Id);
            }
        }

        return 
            offers.Select(o => 
                new OfferListResponse(
                    o.Id, 
                    o.ArtistId, 
                    string.Concat(o.Artist.FirstName ?? string.Empty, " ", o.Artist.LastName ?? string.Empty),
                    o.Title, 
                    o.Price, 
                    o.Archived,
                    o.Sold,
                    o.IsAuction,
                    o.CompressedPicture))
                    .ToArray();
    }

    [HttpGet("count")]
    public async Task<ActionResult<int>> GetOffersPageCountAsync(
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
        bool? includeSold,
        bool? includeArchived,
        [FromQuery] string[]? Tags,
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
            IncludeSold = includeSold == null ? false : (bool)includeSold, 
            IncludeArchived = includeArchived == null ? false : (bool)includeArchived, 
            Tags = Tags, 
            PageSize = PageSize, 
            Page = Page
        };
        var items = await _offersRepository.GetOffersCountAsync(filtersPayload);
        return Ok(new { pageCount = (items/PageSize)+1});
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
        bool? includeSold,
        bool? includeArchived,
        [FromQuery] string[]? Tags,
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
            IncludeSold = includeSold == null ? false : (bool)includeSold, 
            IncludeArchived = includeArchived == null ? false : (bool)includeArchived, 
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

        foreach(var offer in offers.Where(o => o.IsAuction)){
            offer.Price =  await _bidsRepository.GetHighestOfferBid(offer.Id);
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
                    o.Sold,
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

        foreach(var offer in offers.Where(o => o.IsAuction)){
            offer.Price =  await _bidsRepository.GetHighestOfferBid(offer.Id);
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
                    o.Sold,
                    o.IsAuction,
                    "Not included - we value your scrolling time :-)",
                    userFavorites.Contains(o.Id)))
                    .ToArray();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OfferDetailsResponse>> GetOfferDescriptionAsync(int id)
    {
        var offer = await _offersRepository.GetOfferAsync(id);

        if(offer.IsAuction)
        {
            offer.Price = await _bidsRepository.GetHighestOfferBid(offer.Id);
        }

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
            offer.IsAuction,
            offer.Archived,
            offer.Sold,
            offer.AuctionEndTime,
            offer.Picture,
            offer.Tags?.Select(o => o.Name).ToArray()
        );
    }
}