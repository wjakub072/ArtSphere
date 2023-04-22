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
<<<<<<< HEAD
    
=======
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
}