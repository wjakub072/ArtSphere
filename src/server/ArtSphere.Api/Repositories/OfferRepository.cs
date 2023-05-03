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
        return await _db.Offers.Include(c => c.Artist).AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<Offer>> GetArtistsOffers(int artistId)
    {
        return await _db.Offers.Where(o => o.ArtistId == artistId).AsNoTracking().ToListAsync();
    }

    public async Task<Offer> AddOffer(int artistId, OfferPayload offerPayload)
    {
        var offer = new Offer()
        {
            ArtistId = artistId,
            Category = offerPayload.Category,
            Technic = offerPayload.Technic,
            Title = offerPayload.Title, 
            Topic = offerPayload.Topic,
            Description = offerPayload.Description,
            Price = offerPayload.Price,
            DimensionsX = offerPayload.DimensionsX, 
            DimensionsY = offerPayload.DimensionsY,
            Unit = offerPayload.Unit,
            Picture = offerPayload.Picture
        };
        _db.Offers.Add(offer);
        await _db.SaveChangesAsync();
        return offer;
    }

    public async Task<Offer> EditOffer(int id, OfferPayload offerPayload)
    {
        var offer = await _db.Offers.FirstOrDefaultAsync(c => c.Id == id);
        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym id.");

        offer.Category = offerPayload.Category;
        offer.Technic = offerPayload.Technic;
        offer.Title = offerPayload.Title;
        offer.Topic = offerPayload.Topic;
        offer.Description = offerPayload.Description;
        offer.Price = offerPayload.Price;
        offer.DimensionsX = offerPayload.DimensionsX;
        offer.DimensionsY = offerPayload.DimensionsY;
        offer.Unit = offerPayload.Unit;
        offer.Picture = offerPayload.Picture;

        await _db.SaveChangesAsync();
        return offer;
    }

    public async Task DeleteOffer(int id)
    {
        var offer = await _db.Offers.FirstOrDefaultAsync(c => c.Id == id);
        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym id.");

        _db.Offers.Remove(offer);
        await _db.SaveChangesAsync();
    }

    public async Task<Offer> ArchiveOffer(int id)
    {
        var offer = await _db.Offers.FirstOrDefaultAsync(c => c.Id == id);
        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym id.");

        offer.Archived = true;
        
        await _db.SaveChangesAsync();
        return offer;
    }

    public async Task<Offer> GetOfferAsync(int id)
    {
        var offer = await _db.Offers.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym id.");

        return offer;
    }
}