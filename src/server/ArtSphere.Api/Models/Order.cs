using System.Collections.ObjectModel;

namespace ArtSphere.Api.Models;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public decimal Amount { get; set; }
    public int PaymentMethod { get; set; }
    public DateTime ExecutionDate { get; set; }

    public Collection<OrderElement> Elements { get; set; }

    public string AddressCountry { get; set; }
    public string AddressCity { get; set; }
    public string AddressStreet { get; set; }
    public string AddressBuilding { get; set; }
    public string? AddressApartment { get; set; }
    public string AddressPostalCode { get; set; }

    public bool IsInvoice { get; set; }
    public string? CompanyAddressStreet { get; set; }
    public string? CompanyAddressBuilding { get; set; }
    public string? CompanyAddressApartment { get; set; }
    public string? CompanyAddressPostalCode { get; set; }
    public string? CompanyAddressCity { get; set; }
    public string? CompanyAddressCountry { get; set; }
}