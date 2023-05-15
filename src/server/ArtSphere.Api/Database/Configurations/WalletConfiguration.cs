namespace ArtSphere.Api.Database.Configuration;

using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class WalletEntityTypeConfiguration : IEntityTypeConfiguration<Wallet>
{
    public void Configure(EntityTypeBuilder<Wallet> builder)
    {
        builder.HasKey(w => w.WalletId);

        builder.Property(w => w.Balance).HasPrecision(15,4).HasDefaultValue(decimal.Zero);
        builder.Property(w => w.CreatedAt).HasDefaultValue(DateTime.Now);

        builder.HasOne(w => w.User)
               .WithOne(u => u.Wallet)
               .HasForeignKey<Wallet>(w => w.UserId);
    }
}
