using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArtSphere.Api.Controllers;


[Authorize]
[ApiController]
[Route("api/profile/cart")]
public class ShoppingCartController : ControllerBase
{
    private readonly ShoppingCartRepository _shoppingCartRepository;

    public ShoppingCartController(ShoppingCartRepository shoppingCartRepository)
    {
        _shoppingCartRepository = shoppingCartRepository;
    }

    [HttpGet]
    public async Task<ActionResult<ShoppingCartElementResponse[]>> GetUserCartAsync(){
        return Ok();
    }

}