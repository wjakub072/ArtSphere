

using System.Globalization;
using System.Security.Claims;
using ArtSphere.Api;
using ArtSphere.Api.Database;
using ArtSphere.Api.Services;
using ArtSphere.Models.Auth;
using ArtSphere.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console(formatProvider: CultureInfo.CurrentCulture)
    .CreateBootstrapLogger();
try
{
    
    var builder = WebApplication.CreateBuilder(args);

    // logging
    builder.Host.UseSerilog((ctx, setup) => setup
        .ReadFrom.Configuration(builder.Configuration));
    
    builder.Services.AddDbContext<ApplicationDatabaseContext>((config) => {
        config.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDatabase"));
        
        if(builder.Environment.IsDevelopment())
        {
            config.EnableDetailedErrors();
            config.EnableSensitiveDataLogging();
        }
    }, 
    ServiceLifetime.Scoped, ServiceLifetime.Scoped);


    builder.Services.AddControllers();

    // identity
    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
        .AddClaimsPrincipalFactory<ApplicationClaimsPrincipalFactory>()
        .AddEntityFrameworkStores<ApplicationDatabaseContext>() 
        .AddDefaultTokenProviders();
    
    builder.Services.Configure<IdentityOptions>(options =>
    {
        options.Stores.MaxLengthForKeys = 128;
        options.Stores.ProtectPersonalData = false;

        if (builder.Environment.IsProduction())
        {
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 8;
            options.Password.RequiredUniqueChars = 3;
            options.Password.RequireLowercase = true;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = true;
        }
        else
        {
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 3;
            options.Password.RequiredUniqueChars = 3;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
        }

        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;

        options.SignIn.RequireConfirmedAccount = false;
        options.SignIn.RequireConfirmedEmail = false;
        options.SignIn.RequireConfirmedPhoneNumber = false;

        options.Tokens.AuthenticatorIssuer =
            builder.Configuration.GetValue<string>("Security:Token:Issuer") ??
                throw new InvalidOperationException("Settings Security:Token:Issuer cannot be empty");

        // cSpell: disable-next-line
        options.User.AllowedUserNameCharacters = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ0123456789-._@+ ";
        options.User.RequireUniqueEmail = false;

        options.ClaimsIdentity.RoleClaimType = ClaimTypes.Role;
        options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Name;
        options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    });
    
    builder.Services.AddScoped<AuthService>();

    builder.Services.AddEndpointsApiExplorer();

    builder.Services.AddSwaggerGen();
    
    var app = builder.Build();
    
    
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    
    app.UseHttpsRedirection();
    
    app.UseAuthorization();
    
    app.MapControllers();

    app.Run();
    
}
catch (System.Exception ex)
{
    Log.Fatal(ex, ex.GetBaseException().Message);
} 
finally 
{
    Log.CloseAndFlush();
}
