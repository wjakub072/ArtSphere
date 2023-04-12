using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using ArtSphere.Api.Models.Dto.Payloads;

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

    public async Task<User> CreateBlankUserAsync(SignUpCredentialsPayload payload)
    {
        User appUser = new User() 
        { 
            Email = payload.Email
        };
        _db.Add(appUser);
        await _db.SaveChangesAsync();
        return appUser;
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