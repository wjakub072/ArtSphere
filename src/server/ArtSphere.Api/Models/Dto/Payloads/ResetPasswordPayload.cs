using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class ResetPasswordPayload
{
    [Required]
    [StringLength(100)]
    public string EmailOrUsername { get; set; }

    [Required]
<<<<<<< HEAD
    [StringLength(100, MinimumLength = 3)]
    public string CurrentPassword { get; set; }

    [Required]
=======
>>>>>>> a5e3f3cb8c28a88e0a3397f58f6b05d61e1ddc1a
    [StringLength(100, MinimumLength = 8)]
    public string NewPassword { get; set; }
}