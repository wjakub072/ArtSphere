using System.Collections.ObjectModel;
using ArtSphere.Api.Models;
using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using ArtSphere.Api.Validators;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace ArtSphere.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/profile/orders")]
public class OrderController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UsersRepository _usersRepository;
    private readonly OrdersRepository _ordersRepository;

    public OrderController(UserManager<ApplicationUser> userManager, UsersRepository usersRepository, OrdersRepository ordersRepository)
    {
        _userManager = userManager;
        _usersRepository = usersRepository;
        _ordersRepository = ordersRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<OrderListResponse[]>> GetUserOrdersAsync(int pageSize, int page)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User!.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            pageSize = pageSize == 0 ? 10 : pageSize;
            page = page == 0 ? 1 : pageSize;

            var userOrders = await _ordersRepository.GetUserOrdersAsync(user.AccountId, pageSize, page);
            foreach (var order in userOrders)
            {
                if(order.Status == OrderStatus.Canceled)
                    continue;
                
                if(DateTime.Now.AddHours(-4) > order.ExecutionDate)
                    order.Status = OrderStatus.InRealization;
                
                if(DateTime.Now.AddDays(-2) > order.ExecutionDate)
                    order.Status = OrderStatus.Shipped;
                
                if(DateTime.Now.AddDays(-4) > order.ExecutionDate)
                    order.Status = OrderStatus.Received;
                
            }
            if(userOrders.Any()){
                return Ok(userOrders
                    .Select(
                        o => new OrderListResponse
                                (   
                                    o.Id,
                                    o.ExecutionDate,
                                    o.Elements.Count, 
                                    o.Amount, 
                                    Enum.GetName(typeof(OrderStatus), o.Status) ?? "Unrecognised"
                                )
                            )
                    .ToArray());
            } else {
                return Ok(Array.Empty<OrderListResponse>());
            }
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> CancelUserOrderAsync(int id)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User!.Identity!.Name!);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var order = await _ordersRepository.GetOrderAsync(id);

            if(order == null)
                return BadRequest(new { success = false, message = "Określone zamówienie nie zostało odnalezione."});

            if(order.UserId != user.AccountId) 
                return BadRequest(new { success = false, message = "Użytkownik nie dokonał tego zamówienia."});
            
            if(order.Status == OrderStatus.Canceled)
                return BadRequest(new { success = false, message = "Zamówienie już zostało anulowane."});


            if(DateTime.Now.AddDays(-2) > order.ExecutionDate)
                    return BadRequest(new { success = false, message = "Brak możliwości anulowania wysłanego zamówienia."});
                
            await _ordersRepository.CancelOrderAsync(id, user.AccountId);

            return Ok(new { success = true, message = "Zamówienie zostało anulowane." } );
        }

        return BadRequest("Do użytkownika nie został przypisany żaden profil.");
    }
}