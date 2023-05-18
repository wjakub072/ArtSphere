namespace ArtSphere.Api.Models.Dto.Responses;

public record OrderResponse(
    bool success, 
    string message,
    decimal? fundsAfterTransaction = null
);