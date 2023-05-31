namespace ArtSphere.Api.Models.Dto.Payloads;

public class OfferFiltersPayload
{
    public string? Category { get; set; }
    public string? Technic { get; set; }
    public string? Title { get; set; }
    public string? Topic { get; set; }
    public decimal? PriceBottom { get; set; }
    public decimal? PriceTop { get; set; }
    public decimal? DimensionsXBottom { get; set; }
    public decimal? DimensionsXTop { get; set; }
    public decimal? DimensionsYBottom { get; set; }
    public decimal? DimensionsYTop { get; set; }
    public int PageSize { get; set; }
    public int Page { get; set; }
    public string[]? Tags { get; set; }
}