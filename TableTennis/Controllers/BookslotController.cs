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

        [HttpPost, Route("api/Bookslot/book")]
        public HttpResponseMessage book(int[] slots)
        {
            //Converting slots int array to comma separated string slotList
            var slotList = string.Join(",", slots);

            //Booking list of slots at once
            var entity = entities.usp_BookSlot(slotList, System.Web.HttpContext.Current.Session["UserEmail"].ToString());
            if (entity != null)
            {
                SendEmail send = new SendEmail();
                int x = send._SendEmail("no-reply@qfun.com", System.Web.HttpContext.Current.Session["UserEmail"].ToString(), "New Slot Booked", "Hi "+ System.Web.HttpContext.Current.Session["UserName"] + ", Thanks for booking");
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

            var temp = list[0].ToString();//Contains all slots first half as updated and second half as cancelled
            string[] slots = temp.Split(':');
            var updateSlots = slots[0];//has list of updated slots
            var cancelSlots = slots[1];//has list of cancelled slotsS
            var entity1 = entities.usp_UpdateSlotResult(updateSlots, cancelSlots, System.Web.HttpContext.Current.Session["UserEmail"].ToString());
            if (entity1 != null)
            {
                SendEmail send = new SendEmail();
                int x = send._SendEmail("no-reply@qfun.com", System.Web.HttpContext.Current.Session["UserEmail"].ToString(), "Slot Updated", "Hi " + System.Web.HttpContext.Current.Session["UserName"] + ", Thanks for booking");
                return Request.CreateResponse(HttpStatusCode.Created, entity1);

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Updation of slots failed at backend");
            }
        }

    }
}
