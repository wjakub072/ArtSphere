using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class ChangeEmailPayload
{
    [Required]
    [StringLength(100)]
    public string NewEmail { get; set; }

    [Required]
    [StringLength(100)]
    public string CurrentPassword { get; set; }
}