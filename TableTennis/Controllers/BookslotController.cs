using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using TableTennis.Models;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;
using System.Net.Mail;
using Newtonsoft.Json;

namespace TableTennis.Controllers
{
    public class BookslotController : ApiController
    {
        GenesysProjectEntities entities = new GenesysProjectEntities();
        [HttpPost,Route("api/Bookslot/book")]
        public HttpResponseMessage book(int[] slots)
        {
            // converting slots int array to comma separated string slotList
            var slotList = string.Join(",", slots);

            var entity = entities.usp_BookSlot(slotList, System.Web.HttpContext.Current.Session["UserEmail"].ToString());
            if (entity != null)
            {
                SendEmail send = new SendEmail();
                int x = send._SendEmail("Email", "Pass", System.Web.HttpContext.Current.Session["UserEmail"].ToString(), "Hi, Thanks for booking!!!!!!!", "Booked a new slot");
              return Request.CreateResponse(HttpStatusCode.Created, entity);

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No new slot selected for booking");
            }

          
        }
     
        [HttpPost, Route("api/Bookslot/update")]
        public HttpResponseMessage update(string[] list)
        {
            
            var temp = list[0].ToString();
            string[] slots = temp.Split(':');
            var updateSlots = slots[0];
            var cancelSlots = slots[1];
      
           

            var entity1 = entities.usp_UpdateSlotResult(updateSlots, cancelSlots, System.Web.HttpContext.Current.Session["UserEmail"].ToString());
            if (entity1 != null)
            {
                return Request.CreateResponse(HttpStatusCode.Created, entity1);

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Updation of slots failed at backend");
            }
        }

    }
}
