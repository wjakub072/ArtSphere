namespace ArtSphere.Api.Models.Dto.Responses;

public record ArtistResponse
(
    int Id, 
    string FirstName,
    string LastName,
    string Description,
    string AddressCountry,
    string ProfilePicture,

    OfferListResponse[] Offers
);