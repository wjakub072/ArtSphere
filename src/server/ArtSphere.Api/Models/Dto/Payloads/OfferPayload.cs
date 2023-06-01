using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class OfferPayload
{
    [Required]
    public string Category { get; set; }
    [Required]
    public string Technic { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Topic { get; set; }
    public string? Description { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public decimal DimensionsX { get; set; }
    [Required]
    public decimal DimensionsY { get; set; }
    [Required]
    public string Unit { get; set; }
    public bool IsAuction { get; set; }
    public DateTime? AuctionEndTime { get; set; }
    public string? Picture { get; set; }
    public string[]? Tags { get; set; }
}