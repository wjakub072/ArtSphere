namespace ArtSphere.Api.Models.Dto.Responses;

public record DepositResultResponse(
    bool Success, 
    string Message,
    decimal? AmountOfDeposit = null,
    decimal? BalanceAfterDeposit = null
);