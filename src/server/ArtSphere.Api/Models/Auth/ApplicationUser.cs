using Microsoft.AspNetCore.Identity;

namespace ArtSphere.Models.Auth;

public class ApplicationUser : IdentityUser<int>
{
    public int AccountId { get; set; }
}
