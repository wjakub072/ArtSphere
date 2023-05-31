namespace ArtSphere.Api.Models.Dto.Responses;

public record ShoppingCartElementResponse
(
    string Title,
    int OfferId,
    string Author,
    int ArtistId,
    decimal Price,
    string Picture
);