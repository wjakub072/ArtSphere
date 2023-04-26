using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class DeleteOfferPayload
{
    [Required]
    public int OfferId { get; set; }
    [Required]
    public bool Archive { get; set; }
}