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

    public async Task<decimal> GetUserShoppingCartElementsSum(int userId)
    {
        return await _dbContext.ShoppingCart
                            .Where(c => c.UserId == userId)
                            .Include(c => c.Offer)
                            .SumAsync(c => c.Offer.Price);
    }

    public async Task<bool> AnyUserShoppingCartElements(int userId)
    {
        return await _dbContext.ShoppingCart
                            .Where(c => c.UserId == userId)
                            .AnyAsync();
    }

    public async Task<bool> OfferExistsInUserShoppingCart(int userId, int offerId){
        return await _dbContext.ShoppingCart
                            .Where(c => c.UserId == userId && c.OfferId == offerId)
                            .AnyAsync();
    }

    public async Task AddOfferToUserShoppingCartAsync(int userId, int offerId)
    {
        _dbContext.ShoppingCart.Add(new ShoppingCartElement(){
            UserId = userId,
            OfferId = offerId,
            CreateDate = DateTime.Now
        });

        await _dbContext.SaveChangesAsync();
    }


    public async Task DeleteOfferFromUserShoppingCartAsync(int userId, int offerId)
    {
        var offerCartElement = await _dbContext.ShoppingCart.FirstOrDefaultAsync(c => c.UserId == userId && c.OfferId == offerId);
        if(offerCartElement == null) throw new Exception("Uzytkownik nie posiadał w koszyku podanej oferty.");

        _dbContext.ShoppingCart.Remove(offerCartElement);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<decimal> PlaceShoppingOrderAsync(Order order)
    {
        _dbContext.Orders.Add(order);
        await _dbContext.SaveChangesAsync();
        
        await DeleteUserShoppingCartElements(order.UserId);
        
        var wallet = await _dbContext.Wallets.FirstOrDefaultAsync(w => w.UserId == order.UserId);
        if(wallet == null) throw new Exception("Użytkownik nie posiada przypisanego portfela.");
        if(order.PaymentMethod == 1){
            wallet.Balance -= order.Amount;
            wallet.LastUpdated = DateTime.Now;
            await _dbContext.SaveChangesAsync();
        }
        
        return wallet.Balance;
    }

    private async Task DeleteUserShoppingCartElements(int userId){
        var cartElements = await _dbContext.ShoppingCart.Where(c => c.UserId == userId).ToListAsync();
        _dbContext.ShoppingCart.RemoveRange(cartElements);
        await _dbContext.SaveChangesAsync();
    }
}