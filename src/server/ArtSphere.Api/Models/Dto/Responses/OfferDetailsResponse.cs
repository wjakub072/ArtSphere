namespace ArtSphere.Api.Models.Dto.Responses;

public record OfferDetailsResponse
(
    int Id, 
    int ArtistId, 
    string ArtistName,
    string Category,
    string Technic,
    string Topic,
    string? Description,
    decimal DimensionsX,
    decimal DimensionsY,
    string Unit, 
    string Title, 
    decimal Price,
    bool IsAuction,
    bool Archived,
    bool Sold,
    DateTime? AuctionEndTime,
    string? Photo,
    string[]? Tags
);