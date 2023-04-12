namespace ArtSphere.Models.Auth;

public static class ApplicationRoles
{
    public const string Admin = "administrator";
    public const string Artist = "artysta";
    public const string Client = "klient";
    public static string[] All = new string[] { Admin, Artist, Client };

    public static readonly string[] AdminRoles = new[] { Admin };
    public static readonly string[] ArtistRoles = new[] { Admin, Artist };
    public static readonly string[] ClientRoles = new[] { Admin, Client, Artist };
}
