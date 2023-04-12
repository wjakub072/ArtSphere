namespace ArtSphere.Api.Models.Dto.Responses;

public record class UserResponse
(
    string Message,
    string Role,
    bool IsActive
);
