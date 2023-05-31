namespace ArtSphere.Api.Models.Dto.Responses;

public record WithdrawResultResponse(
    bool Success, 
    string Message, 
    decimal? AmountOfWithdraw= null,
    decimal? BalanceAfterWithdraw = null
);