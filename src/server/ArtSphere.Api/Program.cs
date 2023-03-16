

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


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


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
