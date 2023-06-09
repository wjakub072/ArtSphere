namespace ArtSphere.Api.Models;

public class Offer
{
    public int Id { get; set; }
    public int ArtistId { get; set; }
    public string Category { get; set; }
    public string Technic { get; set; }
    public string Topic { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public bool IsAuction { get; set; }
    public decimal DimensionsX { get; set; }
    public decimal DimensionsY { get; set; }
    public string Unit { get; set; }
    public bool Archived { get; set; }
    public bool Validated { get; set; }
    public bool Approved { get; set; }
    public bool Sold { get; set; }
    public DateTime CreationTime { get; set; }
    public DateTime? AuctionEndTime { get; set; }
    public string? Picture { get; set; }
    public string? CompressedPicture { get; set; }
    public User Artist { get; set; }
    public ICollection<Tag> Tags { get; set; }
    public List<Bid>? Bids { get; set; }
}