using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class ProfileCompanyInfoPayload
{
    public string? CompanyName { get; set; }
    public string? CompanyVatId { get; set; }
    public string? CompanyAddressCountry { get; set; }
    public string? CompanyAddressCity { get; set; }
    public string? CompanyAddressStreet { get; set; }
    public string? CompanyAddressBuilding { get; set; }
    public string? CompanyAddressApartment { get; set; }
    public string? CompanyAddressPostalCode { get; set; }
}