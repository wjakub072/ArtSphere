namespace ArtSphere.Api.Models.Dto.Responses;

public record class DeleteOfferResponse
(
    bool Success,
    string Message,
    string? Title = null
){}