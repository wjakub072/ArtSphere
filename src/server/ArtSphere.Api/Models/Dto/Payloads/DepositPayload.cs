namespace ArtSphere.Api.Models.Dto.Payloads;

public class DepositPayload 
{
    public decimal Amount { get; set; }
    public string Token { get; set; } = string.Empty;
}