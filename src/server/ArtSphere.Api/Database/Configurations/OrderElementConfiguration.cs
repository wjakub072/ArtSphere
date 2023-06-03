using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtSphere.Api.Database.Configuration;
public class OrderElementConfiguration : IEntityTypeConfiguration<OrderElement>
{
    public void Configure(EntityTypeBuilder<OrderElement> builder)
    {
        builder.ToTable("OrderElements"); // Set the table name if necessary
        builder.HasKey(oe => oe.Id); // Set the primary key
        builder.Property(oe => oe.Id).IsRequired();
        builder.Property(oe => oe.OrderId).IsRequired();
        builder.Property(oe => oe.OfferId).IsRequired();
        builder.Property(oe => oe.Amount).IsRequired();
        // Configure the relationship to Offer (assuming a one-to-one or many-to one relationship)
        builder.HasOne(oe => oe.Offer)
            .WithMany()
            .HasForeignKey(oe => oe.OfferId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);
    }
}
