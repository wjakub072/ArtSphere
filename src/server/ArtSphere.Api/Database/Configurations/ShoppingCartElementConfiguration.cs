using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtSphere.Api.Database.Configuration;

public class ShoppingCartElementConfiguration : IEntityTypeConfiguration<ShoppingCartElement>
{
    public void Configure(EntityTypeBuilder<ShoppingCartElement> builder)
    {
        builder.ToTable("ShoppingCartElement", "Sph").HasKey(c => c.Id);
        builder.Property(c => c.CreateDate).HasDefaultValue(DateTime.Now);

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(e => e.UserId);

        builder.HasOne<Offer>()
            .WithMany()
            .HasForeignKey(e => e.OfferId);

    }
}