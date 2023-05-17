namespace ArtSphere.Api.Models;

public class DepositToken
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime CreationTime { get; set; }
    public DateTime ExpirationTime { get; set; }
    public string Value { get; set; }
    public decimal? Amount { get; set; }
    public DateTime? ExecutionTime { get; set; }
}