namespace ArtSphere.Api.Models.Dto.Responses;

public record AddOfferResponse
(
    bool success, 
    string message,
    int Id, 
    int artistId,
    string Title
);