
using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;

[ApiController]
[Route("api/offers")]
public class OfferController : ControllerBase
{
    private readonly OffersRepository _offersRepository;

    public OfferController(OffersRepository offersRepository)
    {
        _offersRepository = offersRepository;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult> AddOfferAsync([FromBody] OfferPayload offerPayload)
    {
        //if (!ModelState.IsValid) return BadRequest(ModelState);

        await _offersRepository.AddOffer(offerPayload);
        return Ok("Dodano oferte");
    }
}