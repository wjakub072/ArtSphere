

using System.Globalization;
using System.Security.Claims;
using ArtSphere.Api;
using ArtSphere.Api.Database;
using ArtSphere.Api.Repositories;
using ArtSphere.Api.Services;
using ArtSphere.Models.Auth;
using ArtSphere.Security;
using Microsoft.AspNetCore.Authorization;
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
    bool seed = SeedData.HasCalled(args);
    if (seed)
    {
        args = SeedData.ClearArguments(args);
    }
    
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
    
    // cookies
    builder.Services.ConfigureApplicationCookie(options =>
    {
        options.Cookie.Name = "X-Access-Token";
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
<<<<<<< HEAD
        options.Cookie.SameSite = SameSiteMode.Strict;
=======
        // options.Cookie.SameSite = SameSiteMode.Strict;
        // options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.None;
>>>>>>> a5e3f3cb8c28a88e0a3397f58f6b05d61e1ddc1a
        options.Cookie.HttpOnly = true;
        options.ExpireTimeSpan = TimeSpan.FromDays(1);
        options.SlidingExpiration = true;

        options.LoginPath = "/sign-in";
        options.LogoutPath = null;

        options.Events.OnValidatePrincipal = ctx =>
        {
            ctx.HttpContext.Items.Add("ExpiresUTC", ctx.Properties.ExpiresUtc);
            return Task.CompletedTask;
        };

        options.Events.OnRedirectToLogin = cxt =>
        {
            cxt.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = cxt =>
        {
            cxt.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToLogout = cxt =>
        {
            cxt.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
    });

    // authorization
    string scopeVersion = builder.Configuration.GetValue<string>("Security:ScopeVersion") ?? "";
    builder.Services.Configure<AuthorizationOptions>(options =>
    {
        options.AddPolicy("IsClient", policy =>
            policy.RequireAuthenticatedUser()
                .AddAuthenticationSchemes(IdentityConstants.ApplicationScheme)
                .RequireClaim("scope", scopeVersion)
                .RequireRole(ApplicationRoles.ClientRoles));

        options.AddPolicy("IsArtist", policy =>
            policy.RequireAuthenticatedUser()
                .AddAuthenticationSchemes(IdentityConstants.ApplicationScheme)
                .RequireClaim("scope", scopeVersion)
                .RequireRole(ApplicationRoles.ArtistRoles));

        options.AddPolicy("IsAdmin", policy =>
            policy.RequireAuthenticatedUser()
                .AddAuthenticationSchemes(IdentityConstants.ApplicationScheme)
                .RequireClaim("scope", scopeVersion)
                .RequireRole(ApplicationRoles.AdminRoles));
    });

    builder.Services.AddMemoryCache();

    builder.Services.AddScoped<UsersRepository>();
    builder.Services.AddScoped<AuthService>();

    builder.Services.AddEndpointsApiExplorer();

    builder.Services.AddCors(options => {
        options.AddPolicy("allowFrontEndOrigin", builder => {
            builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
<<<<<<< HEAD
            .AllowAnyMethod();
=======
            .AllowAnyMethod()
            .AllowCredentials();
            // .SetIsOriginAllowed(_ => true);
>>>>>>> a5e3f3cb8c28a88e0a3397f58f6b05d61e1ddc1a
        });
    });

    builder.Services.AddSwaggerGen();
    
    var app = builder.Build();
    
    if (seed)
    {
        await SeedData.EnsureSeedDataAsync(app.Services);
        return;
    }
    
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseExceptionHandler("/api/error-dev");
    } else 
    {
        app.UseExceptionHandler("/api/error");
    }
    
    app.UseHttpsRedirection();
    
    app.UseAuthorization();
    
    app.MapControllers();

    app.UseCors("allowFrontEndOrigin");
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
