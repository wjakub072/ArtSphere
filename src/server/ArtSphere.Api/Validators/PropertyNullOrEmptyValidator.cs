using System.Collections.ObjectModel;

namespace ArtSphere.Api.Validators;

public static class PropertyNullOrEmptyValidator
{
    public static ValidationResult Validate<T>(T subject, string propertySelector){
        var result = new ValidationResult(true);
        foreach(var prop in subject.GetType().GetProperties()) {
            if(prop.PropertyType == typeof(string) && prop.Name.Contains(propertySelector)){
                if(prop.GetValue(subject) == null)
                {
                    result.Success = false;
                    result.InvalidProperties.Add(prop.Name);
                } else {
                    if(string.IsNullOrEmpty(prop.GetValue(subject).ToString()))
                    {
                        result.Success = false;
                        result.InvalidProperties.Add(prop.Name);
                    }
                }
            }
        }
        return result;
    }
}

public class ValidationResult{
    public bool Success { get; set; }
    public Collection<string> InvalidProperties { get; set; } = new Collection<string>();
    public ValidationResult(bool success)
    {
        Success = success;
    }
}