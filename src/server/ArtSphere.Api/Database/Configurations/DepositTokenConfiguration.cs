using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtSphere.Api.Database.Configuration;

public class DepositTokenConfiguration : IEntityTypeConfiguration<DepositToken>
{
    public void Configure(EntityTypeBuilder<DepositToken> builder)
    {
        builder.ToTable("DepositTokens", "Sph").HasKey(t => t.Id);

        builder.HasIndex(c => c.UserId);
        builder.Property(c => c.CreationTime).HasDefaultValueSql("GETDATE()");
    }
}
