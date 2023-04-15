using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class ProfileAddressInfoPayload
{
    [Required]
    [StringLength(100)]
    public string FirstName { get; set; }

    [Required]
    [StringLength(200)]
    public string LastName { get; set; }

    public string? PhoneNumber { get; set; }  
    public string? AddressCountry { get; set; }
    public string? AddressCity { get; set; }
    public string? AddressStreet { get; set; }
    public string? AddressBuilding { get; set; }
    public string? AddressApartment { get; set; }
    public string? AddressPostalCode { get; set; }
}