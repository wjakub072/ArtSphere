namespace ArtSphere.Api.Models.Dto.Responses;

public record OrderDescriptionResponse(
    int orderId, 
    DateTime executionTime,
    int elementCount,
    decimal amount,
    string status,
    OrderElementResponse[] elements
);