using ArtSphere.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ArtSphere.Models.Auth;
using Microsoft.AspNetCore.Identity;
using System.Reflection;

namespace ArtSphere.Api.Database;

public class ApplicationDatabaseContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
{
    public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> options) : base(options) { }
    public DbSet<User> ASUsers { get; set; }
    public DbSet<Offer> Offers { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<TagDictionary> TagDictionary { get; set; }
    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<ShoppingCartElement> ShoppingCart { get; set; }
    public DbSet<DepositToken> DepositTokens { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderElement> OrderELements { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.HasDefaultSchema("Sph");
        base.OnModelCreating(builder);

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly(), type =>
            {
                string ns = typeof(ApplicationDatabaseContext).Namespace!;
                return type.Namespace?.StartsWith(ns, StringComparison.Ordinal) ?? false;
            });

        builder.Entity<ApplicationUser>().ToTable("IdentityUsers", "auth");
        builder.Entity<ApplicationRole>().ToTable("IdentityRoles", "auth");
        builder.Entity<IdentityUserClaim<int>>().ToTable("UserClaims", "auth");
        builder.Entity<IdentityRoleClaim<int>>().ToTable("RoleClaims", "auth");
        builder.Entity<IdentityUserToken<int>>().ToTable("UserTokens", "auth");
        builder.Entity<IdentityUserLogin<int>>().ToTable("UserLogins", "auth");
        builder.Entity<IdentityUserRole<int>>().ToTable("UserRoles", "auth");
    }

}