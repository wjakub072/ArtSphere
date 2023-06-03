namespace ArtSphere.Api.Models;

public class OrderElement
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int OfferId { get; set; }
    public decimal Amount { get; set; }
    public Offer Offer { get; set; }
}