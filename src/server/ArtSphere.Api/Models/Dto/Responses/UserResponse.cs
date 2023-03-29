namespace ArtSphere.Api.Models.Dto.Responses;

public record class UserResponse
(
    int Id,
    int AccountId,
    string FirstName,
    string SecondName,
    string Email,
    string Role,
    bool IsActive
);
