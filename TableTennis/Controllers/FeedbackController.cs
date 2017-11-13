using System.Data;
using TableTennis.Models;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;
using System.Net.Mail;
using Newtonsoft.Json;
using System.Web.Http;
using System.Net.Http;
using System.Net;

namespace TableTennis.Controllers
{
    public class FeedbackController : ApiController
    {
        GenesysProjectEntities entities = new GenesysProjectEntities();

        [HttpPost, Route("api/Bookslot/feedback")]
        public HttpResponseMessage Feedback(string[] feedbackType)
        {
            
            var entity = entities.usp_SetFeedback(System.Web.HttpContext.Current.Session["UserEmail"].ToString(), feedbackType[0], feedbackType[1]);
            if (entity != null)
            {
                SendEmail send = new SendEmail();
                int x = send._SendEmail("no-reply@qfun.com", System.Web.HttpContext.Current.Session["UserEmail"].ToString(), "Feedback Recorded", "Hi " + System.Web.HttpContext.Current.Session["UserName"] + ", We appreciate your valuable feedback.<br><br>Regards<br>RYM Team");
                return Request.CreateResponse(HttpStatusCode.Created, entity);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Feedback not recorded, Bad status!");
            }
        }

    }
}
