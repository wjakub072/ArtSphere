using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using ArtSphere.Api.Models.Dto.Payloads;
using Microsoft.EntityFrameworkCore;

namespace ArtSphere.Api.Repositories;

public class OffersRepository
{
    private readonly ApplicationDatabaseContext _db;
    public OffersRepository(ApplicationDatabaseContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Offer>> GetOffersAsync()
    {
        return await _db.Offers.ToListAsync();
    }

    public async Task<IEnumerable<Offer>> GetArtistsOffers(int artistId)
    {
        return await _db.Offers.Where(o => o.ArtistId == artistId).ToListAsync();
    }

    public async Task AddOffer(OfferPayload offerPayload)
    {
        _db.Offers.Add(new Offer()
        {
            ArtistId = offerPayload.ArtistId,
            Category = offerPayload.Category,
            Technic = offerPayload.Technic,
            Title = offerPayload.Title, 
            Description = offerPayload.Description,
            Price = offerPayload.Price,
            DimensionsX = offerPayload.DimensionsX, 
            DimensionsY = offerPayload.DimensionsY,
            Unit = offerPayload.Unit
        });
        await _db.SaveChangesAsync();
    }
}