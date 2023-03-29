using System.Runtime.Serialization;
using Microsoft.Extensions.Localization;

namespace ArtSphere.Api.Models;

public class EndUserException : Exception
{
    public EndUserException(string? message) : base(message)
    {
    }

    public EndUserException(string? message, Exception? innerException)
        : base(message, innerException)
    {
    }

    protected EndUserException(SerializationInfo info, StreamingContext context)
        : base(info, context)
    {
    }
}

public static class StringLocalizerExtension
{
    public static EndUserException GetException(this IStringLocalizer localizer, string name)
    {
        return new EndUserException(localizer.GetString(name));
    }

    public static EndUserException GetException(this IStringLocalizer localizer, string name, params object[] arguments)
    {
        return new EndUserException(localizer.GetString(name, arguments));
    }

    public static EndUserException GetException(this IStringLocalizer localizer, Exception innerException, string name)
    {
        return new EndUserException(localizer.GetString(name), innerException);
    }

    public static EndUserException GetException(this IStringLocalizer localizer, Exception innerException, string name, params object[] arguments)
    {
        return new EndUserException(localizer.GetString(name, arguments), innerException);
    }
}
