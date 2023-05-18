using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ArtSphere.Api.Repositories;

public class ShoppingCartRepository
{
    private readonly ApplicationDatabaseContext _dbContext;

    public ShoppingCartRepository(ApplicationDatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<ShoppingCartElement>> GetUserShoppingCartElements(int userId)
    {
        var cartElements = await _dbContext.ShoppingCart
                                    .Where(c => c.UserId == userId)
                                    .Include(c => c.Offer)
                                    .Include(c => c.Offer.Artist)
                                    .Include(c => c.User)
                                    .AsNoTracking()
                                    .ToListAsync();

        return cartElements;
    }

    public async Task AddOfferToUserShoppingCart(int userId, int offerId)
    {
        _dbContext.ShoppingCart.Add(new ShoppingCartElement(){
            UserId = userId,
            OfferId = offerId,
            CreateDate = DateTime.Now
        });
        
        await _dbContext.SaveChangesAsync();
    }


    public async Task DeleteOfferFromUserShoppingCart(int userId, int offerId)
    {
        var offerCartElement = await _dbContext.ShoppingCart.FirstOrDefaultAsync(c => c.UserId == userId && c.OfferId == offerId);
        if(offerCartElement == null) throw new Exception("Uzytkownik nie posiadał w koszyku podanej oferty.");

        _dbContext.ShoppingCart.Remove(offerCartElement);
        await _dbContext.SaveChangesAsync();
    }
}