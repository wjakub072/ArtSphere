namespace ArtSphere.Api.Models.Dto.Responses;

public record OrderElementResponse
(
    int OfferId, 
    int ArtistId,
    int ArtistName,
    string Title, 
    decimal Price,
    string? Photo
);