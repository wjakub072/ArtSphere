namespace ArtSphere.Api.Models.Dto.Responses;

public record OrderListResponse
(
    int orderId, 
    DateTime executionTime,
    int elementCount,
    decimal amount,
    string status
);