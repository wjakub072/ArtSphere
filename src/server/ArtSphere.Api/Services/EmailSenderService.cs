using SendGrid;
using SendGrid.Helpers.Mail;

namespace ArtSphere.Api.Services;

public class EmailSenderService
{
    private readonly ILogger _logger;
    private readonly ISendGridClient _sendEmailClient;

    public EmailSenderService(ILogger<EmailSenderService> logger, ISendGridClient sendEmailClient)
    {
        _logger = logger;
        _sendEmailClient = sendEmailClient;
    }

    public async Task<bool> SendEmail(string subject, string message, string toEmail)
    {
        var msg = new SendGridMessage()
        {
            From = new EmailAddress("artsphere.noreply@gmail.com", "ArtSphere"),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(toEmail));

        msg.SetClickTracking(false, false);
        var response = await _sendEmailClient.SendEmailAsync(msg);
        _logger.LogInformation(response.IsSuccessStatusCode 
                               ? $"Email to {toEmail} queued successfully!"
                               : $"Failure Email to {toEmail}");
        return response.IsSuccessStatusCode;
    }
}