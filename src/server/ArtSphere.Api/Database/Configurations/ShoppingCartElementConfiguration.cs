using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtSphere.Api.Database.Configuration;

public class ShoppingCartElementConfiguration : IEntityTypeConfiguration<ShoppingCartElement>
{
    public void Configure(EntityTypeBuilder<ShoppingCartElement> builder)
    {
        builder.ToTable("ShoppingCartElements", "Sph").HasKey(c => c.Id);
        builder.Property(c => c.CreateDate).HasDefaultValueSql("GETDATE()");

        builder.HasOne<User>(e => e.User)
            .WithMany()
            .HasForeignKey(e => e.UserId);

        builder.HasOne<Offer>(e => e.Offer)
            .WithMany()
            .HasForeignKey(e => e.OfferId);

    }
}