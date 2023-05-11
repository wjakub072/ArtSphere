using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace ArtSphere.Api.Repositories;

public class OffersRepository
{
    private readonly ApplicationDatabaseContext _db;
    private readonly ImageCompressionService _compressionService;
    public OffersRepository(ApplicationDatabaseContext db, ImageCompressionService compressionService)
    {
        _db = db;
        _compressionService = compressionService;
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
        if(!string.IsNullOrEmpty(offerPayload.Picture))
        {
            var compressedPicture = _compressionService.CompressBase64Image(offerPayload.Picture);
            offer.CompressedPicture = compressedPicture;
        }

        if(offerPayload.Tags != null){
            offer.Tags = new List<Tag>();
            foreach (var tag in offerPayload.Tags)
            {
                offer.Tags.Add(new Tag(){
                    DefinedByUser = true,
                    Name = tag
                });
            }
        }
        _db.Offers.Add(offer);
        await _db.SaveChangesAsync();
        return offer;
    }

    public async Task<Offer> EditOffer(int id, OfferPayload offerPayload)
    {
        var offer = await _db.Offers.Include(o => o.Tags).FirstOrDefaultAsync(c => c.Id == id);
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
        if(offer.Picture != offerPayload.Picture)
        {
            if(string.IsNullOrEmpty(offerPayload.Picture))
            {
                offer.Picture = string.Empty;
                offer.CompressedPicture = string.Empty;
            } else {
                offer.Picture = offerPayload.Picture;
                var compressedPicture = _compressionService.CompressBase64Image(offerPayload.Picture);
                offer.CompressedPicture = compressedPicture;
            }
        }

        if(offerPayload.Tags != null){
            foreach (var tag in offerPayload.Tags)
            {
                if(!offer.Tags.Select(ot => ot.Name).Contains(tag)){
                    offer.Tags.Add(new Tag(){
                        DefinedByUser = true,
                        Name = tag
                    });
                }
            }
            foreach (var tagToDelete in offer.Tags.Where(ot => !offerPayload.Tags.Contains(ot.Name)))
            {
                offer.Tags.Remove(tagToDelete);
            }
        }

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
        var offer = await _db.Offers.Include(o => o.Artist).Include(o => o.Tags).AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym id.");

        return offer;
    }
}