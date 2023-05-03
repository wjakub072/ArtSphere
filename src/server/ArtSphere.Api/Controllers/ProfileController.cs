using ArtSphere.Api.Repositories;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Models.Dto.Payloads;

namespace ArtSphere.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/profile")]
public class ProfileController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UsersRepository _usersRepository;

    public ProfileController(UserManager<ApplicationUser> userManager, UsersRepository usersRepository)
    {
        _userManager = userManager;
        _usersRepository = usersRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<ProfileInfoResponse>> GetProfileAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var account = await _usersRepository.GetUserAsync(user.AccountId);

            return Ok(new ProfileInfoResponse(
                account.FirstName?? string.Empty, 
                account.LastName?? string.Empty, 
                account.Description?? string.Empty,
                account.ProfilePicture ?? string.Empty));
        }

        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult> UpdateProfileAsync([FromBody] ProfileInfoPayload payload)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var account = await _usersRepository.UpdateUserProfileAsync(user.AccountId, payload);

            return Ok("Zaktualizowno dane profilu.");
        }

        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<ProfileInfoResponse>> GetProfileAddressAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var account = await _usersRepository.GetUserAsync(user.AccountId);

            return Ok(new ProfileAddressInfoResponse(
                account.FirstName?? string.Empty, 
                account.LastName?? string.Empty, 
                account.PhoneNumber?? string.Empty,
                account.AddressStreet?? string.Empty,
                account.AddressBuilding?? string.Empty,
                account.AddressApartment?? string.Empty,
                account.AddressPostalCode?? string.Empty,
                account.AddressCity?? string.Empty,
                account.AddressCountry ?? string.Empty));
        }

        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<ProfileInfoResponse>> UpdateProfileAddressAsync([FromBody] ProfileAddressInfoPayload payload)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var account = await _usersRepository.UpdateUserAddressAsync(user.AccountId, payload);

            return Ok("Zaktualizowno adres profilu.");
        }

        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpGet("company")]
    public async Task<ActionResult<ProfileInfoResponse>> GetProfileCompanyAsync()
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var account = await _usersRepository.GetUserAsync(user.AccountId);

            return Ok(new ProfileCompanyInfoResponse(
                account.CompanyName?? string.Empty,
                account.CompanyVatId?? string.Empty,
                account.CompanyAddressStreet?? string.Empty,
                account.CompanyAddressApartment?? string.Empty,
                account.CompanyAddressBuilding?? string.Empty,
                account.CompanyAddressPostalCode?? string.Empty,
                account.CompanyAddressCity?? string.Empty,
                account.CompanyAddressCountry ?? string.Empty));
        }

        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }

    [Authorize]
    [HttpPut("company")]
    public async Task<ActionResult<ProfileInfoResponse>> UpdateProfileCompanyAsync([FromBody] ProfileCompanyInfoPayload payload)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user == null) throw new InvalidOperationException("Nie odnaleziono użytkownika.");
        
        if(user?.AccountId != null)
        {
            var account = await _usersRepository.UpdateUserCompanyAsync(user.AccountId, payload);

            return Ok("Zaktualizowno dane do faktury.");
        }

        throw new Exception("Do użytkownika nie został przypisany żaden profil.");
    }
}