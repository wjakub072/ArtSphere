namespace ArtSphere.Api.Models;

public class Tag
{
    public int Id { get; set; }
    public int OfferId { get; set; }
    public int? TagId { get; set; }
    public bool DefinedByUser { get; set; }
    public string Name { get; set; }

    public Offer Offer { get; set; }
}