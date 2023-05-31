using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class ValidationPayload
{
    [Required]
    public bool Result { get; set; }
}