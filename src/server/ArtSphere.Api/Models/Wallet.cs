namespace ArtSphere.Api.Models;

public class Wallet
{
    public int WalletId { get; set; }
    public decimal Balance { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastUpdated { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }
}
