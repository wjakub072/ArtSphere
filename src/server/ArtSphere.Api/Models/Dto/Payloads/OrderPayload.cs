namespace ArtSphere.Api.Models.Dto.Payloads;

public class OrderPayload
{
    public int PaymentMethod { get; set; }
    public string PhoneNumber { get; set; }  = string.Empty;
    public string AddressCountry { get; set; }= string.Empty;
    public string AddressCity { get; set; }= string.Empty;
    public string AddressStreet { get; set; }= string.Empty;
    public string AddressBuilding { get; set; }= string.Empty;
    public string? AddressApartment { get; set; }
    public string AddressPostalCode { get; set; }= string.Empty;
}