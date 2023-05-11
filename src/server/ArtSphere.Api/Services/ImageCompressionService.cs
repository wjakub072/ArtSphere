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

}