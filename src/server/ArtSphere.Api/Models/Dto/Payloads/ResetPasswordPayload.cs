using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class ResetPasswordPayload
{
    [Required]
    [StringLength(100)]
    public string EmailOrUsername { get; set; }

    [Required]
    [StringLength(100)]
    public string CurrentPassword { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 8)]
    public string NewPassword { get; set; }
    
}