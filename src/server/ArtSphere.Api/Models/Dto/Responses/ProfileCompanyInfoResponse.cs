namespace ArtSphere.Api.Models.Dto.Responses;

public record ProfileCompanyInfoResponse 
(
    string CompanyName,
    string CompanyVatId,
    string CompanyAddressStreet,
    string CompanyAddressApartment,
    string CompanyAddressBuilding,
    string CompanyAddressPostalCode,
    string CompanyAddressCity,
    string CompanyAddressCountry
)
{}