using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class BidOfferPayload
{
    [Required]
    public decimal Amount { get; set; }
}