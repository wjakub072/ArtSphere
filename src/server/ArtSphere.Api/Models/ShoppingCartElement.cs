namespace ArtSphere.Api.Models;

public class ShoppingCartElement
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int OfferId { get; set; }
    public DateTime CreateDate { get; set; }

    public User User { get; set; }
    public Offer Offer { get; set; }
}