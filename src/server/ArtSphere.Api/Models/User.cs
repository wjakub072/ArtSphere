namespace ArtSphere.Api.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Description { get; set; } 
    public string? PhoneNumber { get; set; }  
    public string? AddressCountry { get; set; }
    public string? AddressCity { get; set; }
    public string? AddressStreet { get; set; }
    public string? AddressBuilding { get; set; }
    public string? AddressApartment { get; set; }
    public string? AddressPostalCode { get; set; }
    public string? CompanyName { get; set; }
    public string? CompanyVatId { get; set; }
    public string? CompanyAddressStreet { get; set; }
    public string? CompanyAddressBuilding { get; set; }
    public string? CompanyAddressApartment { get; set; }
    public string? CompanyAddressPostalCode { get; set; }
    public string? CompanyAddressCity { get; set; }
    public string? CompanyAddressCountry { get; set; }
    public string? ProfilePicture { get; set; }

    public ICollection<Offer> Offers { get; set; }
}