namespace ArtSphere.Api.Models.Dto.Responses;

public record WalletResponse
(
    decimal Balance,
    DateTime? LastUpdated
);