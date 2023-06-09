using ImageMagick;

namespace ArtSphere.Api.Services;

public class ImageCompressionService
{
    public string CompressBase64Image(string base64Image){
        byte[] imageBytes = Convert.FromBase64String(base64Image);
        var compressionQuality = 100;
        var desiredByteSize = 250 * 1024;
        using (var image = new MagickImage(imageBytes))
        {
            while(image.ToByteArray().Length > desiredByteSize && compressionQuality > 10)
            {
                compressionQuality -= 5;
                image.Quality = compressionQuality;
            }
            return Convert.ToBase64String(image.ToByteArray());
        }
    }

    public string CompressBase64ImageWithDataTag(string base64withDataTag){
        if(!base64withDataTag.Contains("data:image/")) throw new Exception("Przekazano błędy format ciągu znaków Base64 podczas próby kompresji zdjęcia.");
        string base64prefix = base64withDataTag.Substring(0, base64withDataTag.IndexOf(",") + 1);
        string imageData = base64withDataTag.Substring(base64withDataTag.IndexOf(",") + 1);
        imageData = CompressBase64Image(imageData);
        return string.Concat(base64prefix, imageData);
    }

}