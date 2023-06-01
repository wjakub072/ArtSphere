using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using ArtSphere.Api.Models;

namespace ArtSphere.Api.Database.Configuration;

public class BidConfiguration : IEntityTypeConfiguration<Bid>
{
    public void Configure(EntityTypeBuilder<Bid> builder)
    {
        // Table name
        builder.ToTable("Bids");

        // Primary key
        builder.HasKey(b => b.Id);

        // Foreign key relationship with Offer
        builder.HasOne(b => b.Offer)
            .WithMany(o => o.Bids)
            .HasForeignKey(b => b.OfferId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(b => b.SubmissionTime)
            .HasDefaultValueSql("GETDATE()")
            .IsRequired();

        builder.Property(b => b.Value)
            .HasColumnType("decimal(17,4)")
            .IsRequired();
    }
}