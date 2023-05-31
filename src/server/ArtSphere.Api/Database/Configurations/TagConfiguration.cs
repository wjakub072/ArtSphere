using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtSphere.Api.Database.Configuration;


public class TagConfiguration : IEntityTypeConfiguration<Tag>
{
    public void Configure(EntityTypeBuilder<Tag> builder)
    {
        builder.ToTable("Tags", "Sph")
        .HasKey(t => t.Id);
        builder.Property(t => t.OfferId).IsRequired();
        builder.Property(t => t.Name).HasMaxLength(100);
        builder.Property(t => t.DefinedByUser).IsRequired();

        builder.HasOne(t => t.Offer)
            .WithMany(o => o.Tags)
            .HasForeignKey(t => t.OfferId)
            .HasPrincipalKey(o => o.Id);
    }
}