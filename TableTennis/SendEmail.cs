using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Net;
using System.Net.Mail;
using System.Data;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;


namespace TableTennis
{
    public class SendEmail
    {
        public int _SendEmail(String SenderMail, String SenderMailPassword, String ReceiverEmailID, String MessageText, String MessageSubject)
        {
            var apiKey = "";//Get Key from Yasir //System.Environment.GetEnvironmentVariable("SENDGRID_APIKEY");
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(""/*Get Email Id from Yasir*/, "YasirAdmin"),
                Subject = MessageSubject,
                PlainTextContent = "Hello, Email!",
                HtmlContent = MessageText
            };
            msg.AddTo(new EmailAddress(ReceiverEmailID, ReceiverEmailID));
            try
            {

                var response =  client.SendEmailAsync(msg);
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return 0;
            }
            return 1;
        }
        
        }
    }
