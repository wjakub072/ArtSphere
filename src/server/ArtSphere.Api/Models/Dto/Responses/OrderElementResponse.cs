namespace ArtSphere.Api.Models.Dto.Responses;

public record OrderElementResponse
(
    int OfferId, 
    int ArtistId,
    string ArtistName,
    string Title, 
    bool IsAuction,
    DateTime? AuctionEndTime,
    decimal Price,
    string? Photo
);