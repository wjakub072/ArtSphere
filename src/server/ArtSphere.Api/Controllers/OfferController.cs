
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
                    o.Picture))
                    .ToArray();
    }

    [HttpGet()]
    public async Task<ActionResult<OfferListResponse[]>> GetOffersAsync()
    {
        var offers = await _offersRepository.GetOffersAsync();
        return 
            offers.Select(o => 
                new OfferListResponse(
                    o.Id, 
                    o.ArtistId, 
                    string.Concat(o.Artist?.FirstName ?? string.Empty, " ", o.Artist?.LastName ?? string.Empty),
                    o.Title, 
                    o.Price, 
                    o.Archived,
                    o.Picture))
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