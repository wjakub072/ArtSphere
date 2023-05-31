namespace ArtSphere.Api.Models;

public class Bid
{
    public int Id { get; set; }
    public int OfferId { get; set; }
    public int BidderId { get; set; }
    public DateTime SubmissionTime { get; set; }
    public decimal Value { get; set; }
    public Offer Offer { get; set; }
}