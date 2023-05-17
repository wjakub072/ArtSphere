namespace ArtSphere.Api.Models.Dto.Payloads;

public class WithdrawPayload
{
    public string IBAN { get; set; }   
    public string? SWIFT { get; set; }
    public decimal Amount { get; set; }
    public string PasswordConfirmation { get; set; }
}