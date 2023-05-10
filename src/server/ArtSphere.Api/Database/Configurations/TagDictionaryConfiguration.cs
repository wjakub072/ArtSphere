using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtSphere.Api.Database.Configuration;


public class TagDictionaryConfiguration : IEntityTypeConfiguration<TagDictionary>
{
    public void Configure(EntityTypeBuilder<TagDictionary> builder)
    {
        builder.ToTable("TagDictionary", "Sph")
        .HasKey( td => td.Id);
        builder.Property(td => td.Name).HasMaxLength(100).IsRequired();
    }
}
