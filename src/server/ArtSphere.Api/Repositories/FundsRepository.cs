using ArtSphere.Api.Database;
using ArtSphere.Api.Models;
using ArtSphere.Api.Models.Dto.Responses;
using Microsoft.EntityFrameworkCore;

namespace ArtSphere.Api.Repositories;

public class FundsRepository
{
    private readonly ApplicationDatabaseContext _db;
    private readonly Random _random;
    private const string alphanumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public FundsRepository(ApplicationDatabaseContext db)
    {
        _db = db;
        _random = new Random();
    }


    public async Task<DepositToken> CreateUserDepositTokenAsync(int userId)
    {
        var token = new DepositToken(){
            UserId = userId,
            CreationTime = DateTime.Now,
            ExpirationTime = DateTime.Now.AddMinutes(10),
            Value = GetRandomAlphaString(24)
        };

        _db.Add(token);
        await _db.SaveChangesAsync();

        return token;
    }


    public async Task<DepositToken?> GetUserDepositTokenAsync(int userId)
    {
        return await _db.DepositTokens.Where(d => d.UserId == userId && d.Used == false).OrderByDescending(c => c.CreationTime).FirstOrDefaultAsync();
    }


    public async Task<decimal> ExecuteDepositAsync(int userId, decimal amount)
    {
        var wallet = await _db.Wallets.FirstOrDefaultAsync(u => u.UserId == userId);
        if(wallet == null) throw new Exception("Użytkownik nie posiada przypisanego portfela.");

        wallet.Balance += amount;
        wallet.LastUpdated = DateTime.Now;
        await _db.SaveChangesAsync();
        return wallet.Balance;
    }


    private string GetRandomAlphaString(int length)
    {
        return new string(Enumerable.Repeat(alphanumericChars, length)
            .Select(s => s[_random.Next(s.Length)]).ToArray());
    }
}