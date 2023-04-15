using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class PasswordChangeTokenPayload 
{
    [Required]
    [StringLength(100)]
    public string Email { get; set; }
}