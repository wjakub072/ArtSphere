using System.ComponentModel.DataAnnotations;

namespace ArtSphere.Api.Models.Dto.Payloads;

public class UserPersonalDataPayload
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string PhoneNumber { get; set; } 
    [Required] 
    public string AddressCountry { get; set; }
    [Required]
    public string AddressCity { get; set; }
    [Required]
    public string AddressStreet { get; set; }
    [Required]
    public int AddressBuilding { get; set; }
    public string? AddressAppartment { get; set; }
}