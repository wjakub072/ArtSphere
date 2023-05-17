namespace ArtSphere.Api.Models.Dto.Responses;

public record DepositInfoResponse
    (string IBAN, 
     string SWIFT, 
     string ReceiverName, 
     string ReceiverAddress, 
     string Title);