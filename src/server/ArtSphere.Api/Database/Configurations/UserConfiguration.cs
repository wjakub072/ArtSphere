using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtSphere.Api.Database.Configuration;

class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users", "Sph")
        .HasKey(c => c.Id);
        builder.Property(c => c.Email).HasMaxLength(50).IsRequired();
        builder.Property(c => c.FirstName).HasMaxLength(100);
        builder.Property(c => c.LastName).HasMaxLength(200);
        builder.Property(c => c.PhoneNumber).HasMaxLength(16);
        builder.Property(c => c.AddressCountry).HasMaxLength(50);
        builder.Property(c => c.AddressCity).HasMaxLength(200);
        builder.Property(c => c.AddressStreet).HasMaxLength(200);
        builder.Property(c => c.AddressAppartment).HasMaxLength(200);
        builder.Property(c => c.AddressBuilding);

    }
}