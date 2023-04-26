namespace ArtSphere.Api.Models.Dto.Responses;

public record ArtistListResponse
(
    int Id, 
    string FirstName,
    string LastName,
    string ProfilePicture
);