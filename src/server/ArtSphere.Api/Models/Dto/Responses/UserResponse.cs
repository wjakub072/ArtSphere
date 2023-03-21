namespace ArtSphere.Models.Dto.Responses;

public record class UserResponse
(
    int Id,
    string FirstName,
    string SecondName,
    string Email,
    string Role,
    bool IsActive
);
