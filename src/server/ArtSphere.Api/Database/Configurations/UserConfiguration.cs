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
        builder.Property(c => c.AddressApartment).HasMaxLength(20);
        builder.Property(c => c.AddressPostalCode).HasMaxLength(12);
        builder.Property(c => c.AddressBuilding).HasMaxLength(12);
        builder.Property(c => c.Description).HasMaxLength(2000);
        builder.Property(c => c.CompanyName).HasMaxLength(500);
        builder.Property(c => c.CompanyVatId).HasMaxLength(25);
        builder.Property(c => c.CompanyAddressCountry).HasMaxLength(50);
        builder.Property(c => c.CompanyAddressCity).HasMaxLength(200);
        builder.Property(c => c.CompanyAddressStreet).HasMaxLength(200);
        builder.Property(c => c.CompanyAddressApartment).HasMaxLength(20);
        builder.Property(c => c.CompanyAddressPostalCode).HasMaxLength(12);
        builder.Property(c => c.CompanyAddressBuilding).HasMaxLength(12);

        builder.HasMany(c => c.Offers)
        .WithOne(o => o.Artist)
        .HasForeignKey(o => o.ArtistId)
        .HasPrincipalKey(c => c.Id);

        builder.HasOne(u => u.Wallet)
               .WithOne(w => w.User)
               .HasForeignKey<Wallet>(w => w.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}