namespace ArtSphere.Api.Models.Dto.Responses;

public record ProfileAddressInfoResponse 
(
    string FirstName,
    string LastName,
    string PhoneNumber,
    string AddressStreet,
    string? AddressBuilding,
    string AddressApartment,
    string AddressPostalCode,
    string AddressCity,
    string AddressCountry
)
{}