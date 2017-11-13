using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TableTennis;
using System.Data;
using System.Data.SqlClient;
using System.Threading;
using System.Configuration;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;


public partial class Pages_Login : System.Web.UI.Page
{
    public List<usp_GetAvailability_Result> weeklyList = new List<usp_GetAvailability_Result>();
    public List<usp_GetAvailability_Result> currentList = new List<usp_GetAvailability_Result>();
    public List<DateTime> bookedDateList = new List<DateTime>();
    public List<usp_GetBookedHistoryList_Result> bookingHistory = new List<usp_GetBookedHistoryList_Result>();
    public string weeklyData, currentDateData, dateNow, bookedDateData, bookingHistoryData;



    GenesysProjectEntities entities = new GenesysProjectEntities();
    private void Page_Load(object sender, EventArgs e)
    {
 Response.AppendHeader("Refresh", Convert.ToString((Session.Timeout * 60) - 3) + ";URL=SessionTimeOut.aspx");
        //Check whether session is active or not
       
        if (HttpContext.Current.Session["UserName"] == null)
        {

            HttpContext.Current.Response.Redirect("Login.aspx");
        }
        //var autoEvent = new AutoResetEvent(false);
        //var statusChecker = new StatusChecker();
        //var stateTimer = new System.Threading.Timer(statusChecker.ForcedLogout,
        //                   autoEvent, 1000, 15000);

        // 1. Slot availability data
        System.Data.Entity.Core.Objects.ObjectResult<usp_GetAvailability_Result> result = entities.usp_GetAvailability(DateTime.Now.Date, Session["UserEmail"].ToString());

        foreach (usp_GetAvailability_Result l1 in result)
        {
            weeklyList.Add(l1);
        }

        foreach (usp_GetAvailability_Result sub in weeklyList.FindAll(x => x.Date == DateTime.Now.Date))
        {
            currentList.Add(sub);
        }

        // 2. slot available data per user for updation
        System.Data.Entity.Core.Objects.ObjectResult<Nullable<System.DateTime>> user_specific_result = entities.usp_GetBooking(Session["UserEmail"].ToString());
        //   List<usp_GetBookingList_Result> list_Availability_user_7days = new List<usp_GetBookingList_Result>();


        ////list for 7 days cache for slot availability for user specific
        foreach (DateTime list_user in user_specific_result)
        {
            bookedDateList.Add(list_user);
            // user_weeklyList.Add(list_user);
        }

        // 3. History booking data per user
        System.Data.Entity.Core.Objects.ObjectResult<usp_GetBookedHistoryList_Result> user_specific_booking_result = entities.usp_GetBookedHistoryList(Session["UserEmail"].ToString());
        // List<usp_GetBookingHistory_Result> list_history = new List<usp_GetBookingHistory_Result>();

        ////list for 7 days cache for slot availability for user specific
        foreach (usp_GetBookedHistoryList_Result list_his in user_specific_booking_result)
        {
            bookingHistory.Add(list_his);
            //list_history.Add(list_his);
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        weeklyData = js.Serialize(weeklyList);
        currentDateData = js.Serialize(currentList);
        dateNow = js.Serialize(DateTime.Now.Date);
        bookedDateData = js.Serialize(bookedDateList);
        bookingHistoryData = js.Serialize(bookingHistory);
    }
    }
