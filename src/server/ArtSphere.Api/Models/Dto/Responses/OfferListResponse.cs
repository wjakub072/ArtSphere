namespace ArtSphere.Api.Models.Dto.Responses;

public record OfferListResponse
(
    int Id, 
    int ArtistId, 
    string Title, 
    decimal Price,
    bool Archived,
    string? Photo
);