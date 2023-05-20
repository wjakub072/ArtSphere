namespace ArtSphere.Api.Models.Dto.Payloads;

public class OrderPayload
{
    public int PaymentMethod { get; set; }
    public bool Invoice { get; set; }
}