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
                                .ThenInclude(c => c.Offer)
                                .ThenInclude(c => c.Artist)
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

    public async Task ChangeOrderStatusAsync(int orderId, int userId, OrderStatus desiredStatus){
        var order = await _db.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
        if(order == null) throw new Exception("Nie odnaleziono zamówienia!");

        switch (desiredStatus)
        {
            case OrderStatus.Created:
                order.ExecutionDate = DateTime.Now;
                break;
            case OrderStatus.InRealization:
                order.ExecutionDate = DateTime.Now.AddHours(-5);
                break;
            case OrderStatus.Shipped:
                order.ExecutionDate = DateTime.Now.AddDays(-2).AddHours(-1);
                break;
            case OrderStatus.Received:
                order.ExecutionDate = DateTime.Now.AddDays(-4).AddHours(-1);
                break;
            default:
                break;
        }
        order.Status = desiredStatus;
        await _db.SaveChangesAsync();
    }
}