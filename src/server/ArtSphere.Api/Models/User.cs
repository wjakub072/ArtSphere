namespace ArtSphere.Api.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }  
    public string? AddressCountry { get; set; }
    public string? AddressCity { get; set; }
    public string? AddressStreet { get; set; }
    public int? AddressBuilding { get; set; }
    public string? AddressAppartment { get; set; }

}