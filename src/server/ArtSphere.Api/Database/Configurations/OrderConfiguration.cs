using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders"); // Set the table name if necessary

        builder.HasKey(o => o.Id); // Set the primary key

        builder.Property(o => o.Id).IsRequired();
        builder.Property(o => o.UserId).IsRequired();
        builder.Property(o => o.Amount).IsRequired();
        builder.Property(o => o.PaymentMethod).IsRequired();
        builder.Property(o => o.ExecutionDate).IsRequired().HasDefaultValueSql("GETDATE()");
        builder.Property(o => o.Status).IsRequired();

        // Configure the relationship to OrderElement (assuming a one-to-many relationship)
        builder.HasMany(o => o.Elements)
            .WithOne()
            .HasForeignKey(oe => oe.OrderId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        // Configure the address properties
        builder.Property(o => o.AddressCountry).IsRequired();
        builder.Property(o => o.AddressCity).IsRequired();
        builder.Property(o => o.AddressStreet).IsRequired();
        builder.Property(o => o.AddressBuilding).IsRequired();
        builder.Property(o => o.AddressApartment);
        builder.Property(o => o.AddressPostalCode).IsRequired();

        // Configure the company address properties
        builder.Property(o => o.IsInvoice).IsRequired();
        builder.Property(o => o.CompanyAddressStreet);
        builder.Property(o => o.CompanyAddressBuilding);
        builder.Property(o => o.CompanyAddressApartment);
        builder.Property(o => o.CompanyAddressPostalCode);
        builder.Property(o => o.CompanyAddressCity);
        builder.Property(o => o.CompanyAddressCountry);
    }
}
