using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using ArtSphere.Api.Models.Dto.Payloads;
using ArtSphere.Api.Models.Dto.Responses;
using ArtSphere.Api.Repositories;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Identity;

namespace ArtSphere.Api.Services;

public class AuthService
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly UsersRepository _userRepository;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        SignInManager<ApplicationUser> signManager,
        UserManager<ApplicationUser> userManager,
        RoleManager<ApplicationRole> roleManager,
        UsersRepository userRepository,
        ILogger<AuthService> logger)
    {
        _signInManager = signManager;
        _userManager = userManager;
        _roleManager = roleManager;
        _userRepository = userRepository;
        _logger = logger;
    }

    public async Task SignOutAsync()
    {
        await _signInManager.SignOutAsync();
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

        User? appUser = null;
        if (user.AccountId != 0)
        {
            appUser = await _userRepository.GetUserAsync(user.AccountId);
        }

        return new UserResponse(
            Message: $"Pomyślnie zalogowano użytkownika {appUser?.Email ?? ""}",
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

<<<<<<< HEAD
        var appUser = await _userRepository.CreateBlankUserAsync(payload.Email);
=======
        var appUser = await _userRepository.CreateBlankUserAsync(payload);
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
        
        user.AccountId = appUser.Id;
        await _userManager.UpdateAsync(user);

        return new SignUpResponse("Sukcesywnie zarejestrowano konto.", appUser.Id);
    }
  
}