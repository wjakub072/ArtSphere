using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using ArtSphere.Api.Models.Dto.Payloads;
using Microsoft.EntityFrameworkCore;

namespace ArtSphere.Api.Repositories;

public class UsersRepository
{
    private readonly ApplicationDatabaseContext _db;

    public UsersRepository(ApplicationDatabaseContext db)
    {
        _db = db;
    }

    public async Task<User> GetUserAsync(int id)
    {
        var user = await _db.ASUsers.FindAsync(id);
        if(user == null) throw new Exception("Użytkownik o podanym Id nie został odnaleziony.");
        return user;
    }

//TODO IMPLEMENT ProfilePicture AND PAGINATION
    public async Task<IEnumerable<User>> GetArtistsAsync(){ 
        return await _db.ASUsers.FromSqlRaw(@"SELECT TOP (1000) u.[Id]
                    ,u.[Email]
                    ,u.[FirstName]
                    ,u.[LastName]
                    ,u.[Description]
                    ,u.[PhoneNumber]
                    ,u.[AddressCountry]
                    ,u.[AddressCity]
                    ,u.[AddressStreet]
                    ,u.[AddressBuilding]
                    ,u.[AddressApartment]
                    ,u.[AddressPostalCode]
                    ,u.[CompanyName]
                    ,u.[CompanyVatId]
                    ,u.[CompanyAddressStreet]
                    ,u.[CompanyAddressBuilding]
                    ,u.[CompanyAddressApartment]
                    ,u.[CompanyAddressPostalCode]
                    ,u.[CompanyAddressCity]
                    ,u.[CompanyAddressCountry]
                    ,u.[ProfilePicture]
                FROM [ArtSphere].[Sph].[Users] u
                INNER JOIN AUTH.IdentityUsers io on AccountId = u.Id
                INNER JOIN auth.UserRoles on io.Id = UserId
                INNER JOIN auth.IdentityRoles ir on RoleId = ir.Id
                WHERE NormalizedName = 'ARTYSTA'")
                .ToListAsync();
    }

    public async Task<User> GetArtistAsync(int id)
    { 
        var user = await _db.ASUsers.FromSqlRaw(@$"SELECT TOP (1) u.[Id]
                    ,u.[Email]
                    ,u.[FirstName]
                    ,u.[LastName]
                    ,u.[Description]
                    ,u.[PhoneNumber]
                    ,u.[AddressCountry]
                    ,u.[AddressCity]
                    ,u.[AddressStreet]
                    ,u.[AddressBuilding]
                    ,u.[AddressApartment]
                    ,u.[AddressPostalCode]
                    ,u.[CompanyName]
                    ,u.[CompanyVatId]
                    ,u.[CompanyAddressStreet]
                    ,u.[CompanyAddressBuilding]
                    ,u.[CompanyAddressApartment]
                    ,u.[CompanyAddressPostalCode]
                    ,u.[CompanyAddressCity]
                    ,u.[CompanyAddressCountry]
                    ,u.[ProfilePicture]
                FROM [ArtSphere].[Sph].[Users] u
                INNER JOIN AUTH.IdentityUsers io on AccountId = u.Id
                INNER JOIN auth.UserRoles on io.Id = UserId
                INNER JOIN auth.IdentityRoles ir on RoleId = ir.Id
                WHERE NormalizedName = 'ARTYSTA' and u.Id = {id}")
                .FirstOrDefaultAsync();
        if(user == null) throw new Exception($"Nie odnaleziono artysty o id: {id}.");
        return user;    
    }

    public async Task<User> GetArtistAsync(string email)
    { 
        var user = await _db.ASUsers.FromSqlRaw(@$"SELECT TOP (1) u.[Id]
                    ,u.[Email]
                    ,u.[FirstName]
                    ,u.[LastName]
                    ,u.[Description]
                    ,u.[PhoneNumber]
                    ,u.[AddressCountry]
                    ,u.[AddressCity]
                    ,u.[AddressStreet]
                    ,u.[AddressBuilding]
                    ,u.[AddressApartment]
                    ,u.[AddressPostalCode]
                    ,u.[CompanyName]
                    ,u.[CompanyVatId]
                    ,u.[CompanyAddressStreet]
                    ,u.[CompanyAddressBuilding]
                    ,u.[CompanyAddressApartment]
                    ,u.[CompanyAddressPostalCode]
                    ,u.[CompanyAddressCity]
                    ,u.[CompanyAddressCountry]
                    ,u.[ProfilePicture]
                FROM [ArtSphere].[Sph].[Users] u
                INNER JOIN AUTH.IdentityUsers io on AccountId = u.Id
                INNER JOIN auth.UserRoles on io.Id = UserId
                INNER JOIN auth.IdentityRoles ir on RoleId = ir.Id
                WHERE NormalizedName = 'ARTYSTA' and u.Email = '{email}'")
                .FirstOrDefaultAsync();
        if(user == null) throw new Exception($"Nie odnaleziono artysty o emailu: {email}.");
        return user;    
    }

    public async Task<User> CreateBlankUserAsync(string email)
    {
        User appUser = new User() 
        { 
            Email = email
        };
        _db.Add(appUser);
        await _db.SaveChangesAsync();
        return appUser;
    }

    public async Task<User> UpdateUserEmailAsync(int accountId, string newEmail)
    {
        var user = _db.ASUsers.Where(u => u.Id == accountId).FirstOrDefault();
        if(user == null) throw new Exception("Użytkownik o podanym Id nie został odnaleziony.");

        user.Email = newEmail;

        await _db.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateUserAddressAsync(int accountId, ProfileAddressInfoPayload payload)
    {
        var user = _db.ASUsers.Where(u => u.Id == accountId).FirstOrDefault();
        if(user == null) throw new Exception("Użytkownik o podanym Id nie został odnaleziony.");

        user.FirstName = payload.FirstName;
        user.LastName = payload.LastName;
        user.PhoneNumber = payload.PhoneNumber;
        user.AddressStreet = payload.AddressStreet;
        user.AddressCountry = payload.AddressCountry;
        user.AddressCity = payload.AddressCity;
        user.AddressBuilding = payload.AddressBuilding;
        user.AddressApartment = payload.AddressApartment;
        user.AddressPostalCode = payload.AddressPostalCode;

        await _db.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateUserCompanyAsync(int accountId, ProfileCompanyInfoPayload payload)
    {
        var user = _db.ASUsers.Where(u => u.Id == accountId).FirstOrDefault();
        if(user == null) throw new Exception("Użytkownik o podanym Id nie został odnaleziony.");

        user.CompanyName = payload.CompanyName;
        user.CompanyVatId = payload.CompanyVatId;
        user.CompanyAddressStreet = payload.CompanyAddressStreet;
        user.CompanyAddressCountry = payload.CompanyAddressCountry;
        user.CompanyAddressCity = payload.CompanyAddressCity;
        user.CompanyAddressPostalCode = payload.CompanyAddressPostalCode;
        user.CompanyAddressBuilding = payload.CompanyAddressBuilding;
        user.CompanyAddressApartment = payload.CompanyAddressApartment;

        await _db.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateUserProfileAsync(int accountId, ProfileInfoPayload payload)
    {
        var user = _db.ASUsers.Where(u => u.Id == accountId).FirstOrDefault();
        if(user == null) throw new Exception("Użytkownik o podanym Id nie został odnaleziony.");

        user.FirstName = payload.FirstName;
        user.LastName = payload.LastName;
        user.Description = payload.Description??string.Empty;
        user.ProfilePicture = payload.Picture;
        
        await _db.SaveChangesAsync();
        return user;
    }

    public async Task DeleteUserAsync(int id)
    {
        var user = await _db.ASUsers.FindAsync(id);
        if(user == null) throw new Exception("Użytkownik o podanym Id nie został odnaleziony.");
        _db.ASUsers.Remove(user);
    }
}