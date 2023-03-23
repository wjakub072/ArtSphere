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

    public async Task<User> UpdateUserAsync(UserPersonalDataPayload payload)
    {
        var user = _db.ASUsers.Where(u => u.Id == payload.Id!).FirstOrDefault();
        if(user == null) throw new Exception("Użytkownik o podanym Id nie został odnaleziony.");

        user.FirstName = payload.FirstName;
        user.LastName = payload.LastName;
        user.PhoneNumber = payload.LastName;
        user.AddressCountry = payload.AddressCountry;
        user.AddressCity = payload.AddressCity;
        user.AddressBuilding = payload.AddressBuilding;
        user.AddressAppartment = payload.AddressAppartment??string.Empty;

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