using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ArtSphere.Api.Repositories;

public class BidsRepository
{
    private readonly ApplicationDatabaseContext _db;

    public BidsRepository(ApplicationDatabaseContext db)
    {
        _db = db;
    }
    public async Task<bool> CheckIfHigherBid(int offerId, decimal amount)
    {
        var offer = await _db.Offers.Where(o => o.Id == offerId).Include(c => c.Bids).FirstOrDefaultAsync();

        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym Id.");
        
        if(offer.IsAuction == false) throw new Exception("Określona oferta nie jest aukcją!");

        if(offer.Bids != null && offer.Bids.Any())
        {
            return offer.Bids.Max(c => c.Value) < amount;
        } else {
            return true;
        }
    }

    public async Task PlaceBid(int offerId, int userId, decimal amount)
    {
        var offer = await _db.Offers.Where(o => o.Id == offerId).Include(c => c.Bids).FirstOrDefaultAsync();

        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym Id.");
        
        if(offer.IsAuction == false) throw new Exception("Określona oferta nie jest aukcją!");

        if(offer.Bids != null && offer.Bids.Any()){
            if(offer.Bids.Max(c => c.Value) < amount){
                offer.Bids.Add(
                    new Bid(){
                    OfferId = offer.Id, 
                    BidderId = userId, 
                    SubmissionTime = DateTime.Now,
                    Value = amount
                    }
                );
            } else {
                throw new Exception("Najwyższa licytacja oferty przewyższa wartośc licytacji użytkownika.");
            }
        } else {
            offer.Bids = new List<Bid>(){
                new Bid(){
                    OfferId = offer.Id, 
                    BidderId = userId, 
                    SubmissionTime = DateTime.Now,
                    Value = amount
                }
            };
        }

    }

    public async Task CancelUserBids(int offerId, int userId)
    {
        var offer = await _db.Offers.Where(o => o.Id == offerId).Include(c => c.Bids).AsNoTracking().FirstOrDefaultAsync();

        if(offer == null) throw new Exception("Nie odnaleziono oferty o podanym Id.");
        
        if(offer.IsAuction == false) throw new Exception("Określona oferta nie jest aukcją!");

        if(offer.Bids != null && offer.Bids.Any()){
            _db.Bids.RemoveRange(_db.Bids.Where(c => c.BidderId == userId && c.OfferId == offerId));

            await _db.SaveChangesAsync();
        } 
    }
}