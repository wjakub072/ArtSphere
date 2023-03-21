using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class SignUpCredentialsPayload
{
    [Required]
    public string Email { get; set; } = "";

    [Required]
    public string Password { get; set; } = "";
    public string Role { get; set; } = "Client";
}