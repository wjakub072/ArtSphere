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

    public async Task<IEnumerable<Offer>> GetOffersAsync(OfferFiltersPayload filtersPayload)
    {
        IQueryable<Offer> offers = _db.Offers.Include(c => c.Artist).Where(o => o.Approved);

        if(filtersPayload.IncludeSold == false)
            offers = offers.Where(c => c.Sold == false);
        
        if(filtersPayload.IncludeArchived == false)
            offers = offers.Where(c => c.Archived == false);

        if(!string.IsNullOrEmpty(filtersPayload.Category))
            offers = offers.Where(c => c.Category == filtersPayload.Category);

        if(!string.IsNullOrEmpty(filtersPayload.Technic))
            offers = offers.Where(c => c.Technic == filtersPayload.Technic);

        if(!string.IsNullOrEmpty(filtersPayload.Title))
            offers = offers.Where(c => c.Title.ToLower().Contains(filtersPayload.Title.ToLower()));

        if(!string.IsNullOrEmpty(filtersPayload.Topic))
            offers = offers.Where(c => c.Topic == filtersPayload.Topic);
        
        if(!string.IsNullOrEmpty(filtersPayload.Artist))
            offers = offers.Where(c => string.Concat(c.Artist.FirstName, " ", c.Artist.LastName).ToLower().Contains(filtersPayload.Artist.ToLower()));

        if(filtersPayload.PriceBottom > decimal.Zero)
            offers = offers.Where(c => c.Price > filtersPayload.PriceBottom);

        if(filtersPayload.PriceTop > decimal.Zero)
            offers = offers.Where(c => c.Price < filtersPayload.PriceTop);
        
        if(filtersPayload.DimensionsXBottom > decimal.Zero)
            offers = offers.Where(c => c.DimensionsX > filtersPayload.DimensionsXBottom);

        if(filtersPayload.DimensionsXTop > decimal.Zero)
            offers = offers.Where(c => c.DimensionsX < filtersPayload.DimensionsXTop);

        if(filtersPayload.DimensionsYBottom > decimal.Zero)
            offers = offers.Where(c => c.DimensionsY > filtersPayload.DimensionsYBottom);

        if(filtersPayload.DimensionsYTop > decimal.Zero)
            offers = offers.Where(c => c.DimensionsY < filtersPayload.DimensionsYTop);

        if(filtersPayload.Tags != null && filtersPayload.Tags.Length > 0)
            offers = offers.Include(c => c.Tags)
                    .Where(c => c.Tags.Any(t => filtersPayload.Tags.Where(c => string.IsNullOrEmpty(c.Trim()) == false).Contains(t.Name)));        

        return await offers
                        .OrderByDescending(c => c.Id)
                        .Skip((filtersPayload.Page - 1) * filtersPayload.PageSize)
                        .Take(filtersPayload.PageSize)
                        .AsNoTracking()
                        .ToListAsync();
    }

    public async Task<int> GetOffersCountAsync(OfferFiltersPayload filtersPayload)
    {
        IQueryable<Offer> offers = _db.Offers.Include(c => c.Artist).Where(o => o.Approved);

        if(!string.IsNullOrEmpty(filtersPayload.Category))
            offers = offers.Where(c => c.Category == filtersPayload.Category);

        if(!string.IsNullOrEmpty(filtersPayload.Technic))
            offers = offers.Where(c => c.Technic == filtersPayload.Technic);

        if(!string.IsNullOrEmpty(filtersPayload.Title))
            offers = offers.Where(c => c.Title == filtersPayload.Title);

        if(!string.IsNullOrEmpty(filtersPayload.Topic))
            offers = offers.Where(c => c.Topic == filtersPayload.Topic);
        
        if(!string.IsNullOrEmpty(filtersPayload.Artist))
            offers = offers.Where(c => string.Concat(c.Artist.FirstName, " ", c.Artist.LastName) == filtersPayload.Artist);

        if(filtersPayload.PriceBottom > decimal.Zero)
            offers = offers.Where(c => c.Price > filtersPayload.PriceBottom);

        if(filtersPayload.PriceTop > decimal.Zero)
            offers = offers.Where(c => c.Price < filtersPayload.PriceTop);
        
        if(filtersPayload.DimensionsXBottom > decimal.Zero)
            offers = offers.Where(c => c.DimensionsX > filtersPayload.DimensionsXBottom);

        if(filtersPayload.DimensionsXTop > decimal.Zero)
            offers = offers.Where(c => c.DimensionsX < filtersPayload.DimensionsXTop);

        if(filtersPayload.DimensionsYBottom > decimal.Zero)
            offers = offers.Where(c => c.DimensionsY > filtersPayload.DimensionsYBottom);

        if(filtersPayload.DimensionsYTop > decimal.Zero)
            offers = offers.Where(c => c.DimensionsY < filtersPayload.DimensionsYTop);

        return await offers.CountAsync();
    }

    public async Task<IEnumerable<Offer>> GetOffersAsync()
    {
        return await _db.Offers.Include(c => c.Artist).AsNoTracking().ToListAsync();
    }

    public async Task<Offer> GetOfferAsync(int id)
    {
        var offer = await _db.Offers.Include(o => o.Artist).Include(o => o.Tags).AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym id.");

        return offer;
    }

    public async Task<Offer?> GetNullableOfferAsync(int id)
    {
        return await _db.Offers.Include(o => o.Artist).Include(o => o.Tags).Include(c => c.Bids).AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<bool> OfferExists(int offerId){
        return await _db.Offers.AnyAsync(o => o.Id == offerId);
    }

    public async Task<bool> IsOfferAnAuction(int offerId){
        return await _db.Offers.AnyAsync(o => o.Id == offerId && o.IsAuction == true);
    }

    public async Task<bool> IsOfferArchieved(int offerId){
        return await _db.Offers.AnyAsync(o => o.Id == offerId && o.IsAuction == true);
    }

    public async Task<bool> DoesUserFavorOffer(int userId, int offerId)
    {
        return await _db.Favorites.Where(c => c.UserId == userId && c.OfferId == offerId).AnyAsync();
    }

    public async Task AddOfferToFavorites(int offerId, int userId)
    {
        _db.Favorites.Add(new Favorite(){ UserId = userId, OfferId = offerId});
        await _db.SaveChangesAsync();
    }

    public async Task RemoveOfferFromFavorites(int offerId, int userId)
    {
        var toDelete = await _db.Favorites.FirstOrDefaultAsync(c => c.UserId == userId && c.OfferId == offerId);
        _db.Favorites.Remove(toDelete);
        await _db.SaveChangesAsync();
    }

    public async Task<IEnumerable<Offer>> GetUserFavoriteOffers (int userId)
    {
        var userFavorites = await _db.Favorites.Where(c => c.UserId == userId).ToListAsync();
        return await _db.Offers.Include(o => o.Artist).Where(o => userFavorites.Select(c => c.OfferId).Contains(o.Id)).AsNoTracking().ToListAsync();
    }

    public async Task<int[]> GetUserFavoriteOffersId(int userId){
        return await _db.Favorites.Where(c => c.UserId == userId).Select(c => c.OfferId).ToArrayAsync();
    }

    public async Task<IEnumerable<Offer>> GetArtistsOffers(int artistId, int pageSize, int page)
    {
        return await _db.Offers.Where(o => o.ArtistId == artistId)
                            .OrderByDescending(c => c.Id)
                            .Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .AsNoTracking()
                            .ToListAsync();
    }

    public async Task<IEnumerable<Offer>> GetLatestOffers(bool auctions, int pageSize, int page)
    {
        return await _db.Offers.Where(o => o.IsAuction == auctions && o.Approved == true)
                            .Include(c => c.Artist)
                            .OrderByDescending(c => c.Id)
                            .Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .AsNoTracking()
                            .ToListAsync();
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
            IsAuction = offerPayload.IsAuction,
            AuctionEndTime = offerPayload.AuctionEndTime,
            DimensionsX = offerPayload.DimensionsX, 
            DimensionsY = offerPayload.DimensionsY,
            Unit = offerPayload.Unit,
            Picture = offerPayload.Picture
        };
        if(!string.IsNullOrEmpty(offerPayload.Picture))
        {
            var compressedPicture = _compressionService.CompressBase64ImageWithDataTag(offerPayload.Picture);
            offer.CompressedPicture = compressedPicture;
        }

        if(offerPayload.Tags != null){
            offer.Tags = new List<Tag>();
            foreach (var tag in offerPayload.Tags.Select(c => c.Trim().ToLower()).Where(c => string.IsNullOrEmpty(c) == false))
            {
                var newTag = new Tag(){
                    DefinedByUser = true,
                    Name = tag
                };
                
                offer.Tags.Add(newTag);
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

        if(offer.Archived || offer.Sold) throw new Exception("Status oferty nie pozwala na jej edycję!");

        offer.Category = offerPayload.Category;
        offer.Technic = offerPayload.Technic;
        offer.Title = offerPayload.Title;
        if(string.IsNullOrEmpty(offerPayload.Title) == false && offer.Title != offerPayload.Title)
        {
            offer.Topic = offerPayload.Topic;
            offer.Approved = false; 
            offer.Validated = false;
        }       
        if(string.IsNullOrEmpty(offerPayload.Description) == false && offer.Description != offerPayload.Description){
            offer.Description = offerPayload.Description;
            offer.Approved = false;
            offer.Validated = false;
        }
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
                var compressedPicture = _compressionService.CompressBase64ImageWithDataTag(offerPayload.Picture);
                offer.CompressedPicture = compressedPicture;
                offer.Approved = false; 
                offer.Validated = false;
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

    public async Task<bool> ValidateOffer(int id, bool result)
    {
        var offer = await _db.Offers.FirstOrDefaultAsync(c => c.Id == id);
        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym id.");
        if(offer.Validated){
            return false;
        }
        offer.Validated = true;
        offer.Approved = result;

        await _db.SaveChangesAsync();
        return true;
    }
    
    public async Task<Offer> ArchiveOffer(int id)
    {
        var offer = await _db.Offers.FirstOrDefaultAsync(c => c.Id == id);
        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym id.");

        offer.Archived = true;
        
        await _db.SaveChangesAsync();
        return offer;
    }

    public async Task<Offer> SoldOffer(int id)
    {
        var offer = await _db.Offers.FirstOrDefaultAsync(c => c.Id == id);
        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym id.");

        offer.Sold = true;
        
        await _db.SaveChangesAsync();
        return offer;
    }

    internal async Task<Offer?> GetOfferToValidateAsync()
    {
        return await _db.Offers.Include(c => c.Artist).Include(c => c.Tags).OrderBy(o => o.CreationTime).FirstOrDefaultAsync(o => o.Validated == false);
    }
}