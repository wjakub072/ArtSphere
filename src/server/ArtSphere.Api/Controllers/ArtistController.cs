
using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;

[ApiController]
[Route("api/artists")]
public class ArtistController : ControllerBase
{
    private readonly UsersRepository _usersRepository;
    private readonly OffersRepository _offersRepository;

    public ArtistController(UsersRepository usersRepository, OffersRepository offersRepository)
    {
        _usersRepository = usersRepository;
        _offersRepository = offersRepository;
    }

    [HttpGet()]
    public async Task<ActionResult<ArtistListResponse>> GetArtistsAsync()
    {
        var artists = await _usersRepository.GetArtistsAsync();

        if(artists.Any())
        {
           return Ok(artists.Select(c => new ArtistListResponse(
                c.Id, 
                c.FirstName ?? string.Empty, 
                c.LastName ?? string.Empty,
                c.ProfilePicture ?? string.Empty))
                 .ToArray());
        } 
        else { return BadRequest("Brak artystów w bazie."); }
    }

    [HttpGet(("{id}"))]
    public async Task<ActionResult<ArtistListResponse>> GetArtistAsync(int id)
    {
        var artist = await _usersRepository.GetArtistAsync(id);

        return Ok(new ArtistResponse(
            artist.Id,
            artist.FirstName ?? string.Empty,
            artist.LastName ?? string.Empty,
            artist.Description ?? string.Empty,
            artist.AddressCountry ?? string.Empty,
            artist.ProfilePicture ?? string.Empty));
    }

    [HttpGet(("{id}/offers"))]
    public async Task<ActionResult<OfferListResponse[]>> GetArtistOffersAsync(int id, int pageSize, int page)
    {
        var artist = await _usersRepository.GetArtistAsync(id);

        var artistsOffers = await _offersRepository.GetArtistsOffers(artist.Id, pageSize, page);

        return Ok(artistsOffers.Where(c => c.Approved)
            .Select(o => new OfferListResponse(
                o.Id, 
                o.ArtistId, 
                string.Concat(artist.FirstName ?? string.Empty, artist.LastName ?? string.Empty),
                o.Title ?? string.Empty,
                o.Price,
                o.Archived,
                o.Sold,
                o.IsAuction,
                o.CompressedPicture))
                .ToArray());
    }
}