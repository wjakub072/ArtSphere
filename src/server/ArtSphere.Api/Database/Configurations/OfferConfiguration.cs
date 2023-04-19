using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtSphere.Api.Database.Configuration;


public class OfferConfiguration : IEntityTypeConfiguration<Offer>
{
    public void Configure(EntityTypeBuilder<Offer> builder)
    {
        builder.ToTable("Offers", "Sph")
        .HasKey(o => o.Id);
        builder.Property(o => o.ArtistId).IsRequired();
        builder.Property(o => o.Category).HasMaxLength(100).IsRequired();
        builder.Property(o => o.Technic).HasMaxLength(100).IsRequired();
        builder.Property(o => o.Title).HasMaxLength(1000).IsRequired();
        builder.Property(o => o.Description).HasMaxLength(2000);
        builder.Property(o => o.Price).HasColumnType("decimal(17,4)").IsRequired();
        builder.Property(o => o.DimensionsX).IsRequired();
        builder.Property(o => o.DimensionsY).IsRequired();
        builder.Property(o => o.Unit).HasMaxLength(50).IsRequired();
    }
}