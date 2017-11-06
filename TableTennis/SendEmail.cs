using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Net;
using System.Net.Mail;
using System.Data;
using System.Threading.Tasks;



namespace TableTennis
{
    public class SendEmail
    {
        public int _SendEmail(string senderEmailID, string receiverEmailID, string messageSubject, string messageBody)
        {

            MailMessage completeMessage = new MailMessage(senderEmailID, receiverEmailID, messageSubject, messageBody);

            //smtp client at mail server location
            string domainName = "", mailuserName = "no-reply@qfun.com", mailPassword = "";
            int portNum = 25;
            SmtpClient client = new SmtpClient(domainName);
            client.Port = portNum;

            // add credentials
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(mailuserName, mailPassword);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //client.EnableSsl = true;

            try
            {
                client.Send(completeMessage);
            }
            catch (Exception e)
            {
                throw;
            }
            return 1;
        }

    }
}
