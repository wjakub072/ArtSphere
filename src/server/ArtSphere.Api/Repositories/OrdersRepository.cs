using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ArtSphere.Api.Repositories;

public class OrdersRepository
{
    private readonly ApplicationDatabaseContext _db;

    public OrdersRepository(ApplicationDatabaseContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Order>> GetUserOrdersAsync(int userId, int pageSize, int page)
    {
        return await _db.Orders.Where(c => c.UserId == userId)
                                .Include(c => c.Elements)
                                .OrderByDescending(c => c.Id)
                                .Skip((page - 1) * pageSize)
                                .Take(pageSize)
                                .AsNoTracking()
                                .ToListAsync();
    }

    public async Task<Order?> GetUserOrderAsync(int userId, int orderId)
    {
        return await _db.Orders.Where(c => c.UserId == userId && c.Id == orderId)
                                .Include(c => c.Elements)
                                .AsNoTracking()
                                .FirstOrDefaultAsync();
    }

    public async Task<Order?> GetOrderAsync(int orderId)
    {
        return await _db.Orders.AsNoTracking().FirstOrDefaultAsync(o => o.Id == orderId);
    }

    public async Task CancelOrderAsync(int orderId, int userId){
        var order = await _db.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
        if(order == null) throw new Exception("Nie odnaleziono zamówienia!");

        order.Status = OrderStatus.Canceled;
        await _db.SaveChangesAsync();
    }
}