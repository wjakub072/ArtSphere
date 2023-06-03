namespace ArtSphere.Api.Models.Dto.Responses;

public record OfferToValidateResponse
(
    int Id, 
    int ArtistId, 
    string ArtistName,
    string Title, 
    string? Description,
    decimal Price,
    bool IsAuction, 
    DateTime? AuctionEndTime,
    decimal DimensionsX,
    decimal DimensionsY,
    bool Archived,
    string? Photo,
    string[] Tags
);