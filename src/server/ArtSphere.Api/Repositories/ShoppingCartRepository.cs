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
}