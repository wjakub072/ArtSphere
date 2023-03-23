using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Models.Auth;
using ArtSphere.Models.Dto.Responses;
using Microsoft.AspNetCore.Identity;

namespace ArtSphere.Api.Services;

public class AuthService
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly ApplicationDatabaseContext _db;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        SignInManager<ApplicationUser> signManager,
        UserManager<ApplicationUser> userManager,
        RoleManager<ApplicationRole> roleManager,
        ApplicationDatabaseContext db,
        ILogger<AuthService> logger)
    {
        _signInManager = signManager;
        _userManager = userManager;
        _roleManager = roleManager;
        _db = db;
        _logger = logger;
    }

    public async Task<UserResponse> SignInAsync(LoginCredentialsPayload credentials)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(credentials.Email);

        if (user == null)
        {
            throw new InvalidOperationException("Błędna nazwa lub hasło użytkownika.");
        }

        SignInResult attempt = await _signInManager.CheckPasswordSignInAsync(
            user,
            credentials.Password,
            lockoutOnFailure: true);

        if (attempt.IsLockedOut || attempt.IsNotAllowed)
        {
            throw new InvalidOperationException("Użytkownik zablokowany. Spróbuj zalogować się później.");
        }

        if (!attempt.Succeeded)
        {
            throw new InvalidOperationException("Błędna nazwa lub hasło użytkownika.");
        }

        await _signInManager.SignInAsync(user, credentials.IsPersistent);

        return await CreateUserResponseAsync(user);
    }

    private async Task<UserResponse> CreateUserResponseAsync(ApplicationUser user)
    {
        ApplicationRole? userRole = null;
        foreach (string roleName in await _userManager.GetRolesAsync(user))
        {
            ApplicationRole? role = await _roleManager.FindByNameAsync(roleName);
            if (role == null) continue;

            if (userRole == null || userRole.Id > role.Id)
            {
                userRole = role;
            }
        }

        User? account = null;
        if (user.AccountId != 0)
        {
            account = await _db.ASUsers.FindAsync(user.AccountId);
            if (account != null)
            {
                throw new Exception("Nie odnaleziono użytkownika.");
            }
        }

        return new UserResponse(
            Id: user.Id,
            Email: account?.Email ?? "",
            FirstName: account?.FirstName ?? "",
            SecondName: account?.LastName ?? "",
            Role: userRole?.Name ?? "",
            IsActive: user.LockoutEnd == null || user.LockoutEnd < DateTimeOffset.UtcNow);
    }

    public async Task<SignUpResponse> SignUpAsync(SignUpCredentialsPayload payload)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(payload.Email);

        if (user != null)
        {
            throw new InvalidOperationException("Użytkownik o podanym mailu już istnieje.");
        }

        if (payload.Role.Length > 0 && await _roleManager.FindByNameAsync(payload.Role) == null)
        {
            throw new InvalidOperationException("Podano błędną rolę.");
        }

        if(payload.Role == ApplicationRoles.Admin)
        {
            throw new InvalidOperationException("Brak możliwości rejestracji konta administratora.");
        }

        user = new()
        {
            UserName = payload.Email,
            Email = payload.Email
        };

        IdentityResult result = await _userManager.CreateAsync(user, payload.Password);

        if (!result.Succeeded)
        {
            throw new InvalidOperationException(result.Errors.First().Description);
        }

        result = await _userManager.AddToRoleAsync(user, payload.Role);

        if (!result.Succeeded)
        {
            throw new InvalidOperationException(result.Errors.First().Description);
        }

        _logger.LogInformation("Konto o mailu {email} został zarejestrowany.", user.Email);

        User account = new User() 
        { 
            Email = payload.Email
        };
        _db.Add(account);
        await _db.SaveChangesAsync();

        return new SignUpResponse("Sukcesywnie zarejestrowano konto.", account.Id);
    }
  
}