using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace TableTennis.Controllers
{
    public class ResetController : ApiController
    {

        GenesysProjectEntities entities = new GenesysProjectEntities();
        [HttpPost]
        public HttpResponseMessage UpdatePass(Employee emp)

        {
            int x = 0;
            DateTime dtOtp = Convert.ToDateTime(System.Web.HttpContext.Current.Session["OTPTimeStamp"]);
            DateTime dtNow = DateTime.Now;
            if (emp.OTP.ToString().Equals(System.Web.HttpContext.Current.Session["GeneratedOTP"]) &&
                dtNow.Subtract(dtOtp).TotalMinutes < 16)
            {
                #region EncryptNewPassword 
                Encrypt_Decrypt ObjEnc = new Encrypt_Decrypt();
                ObjEnc.Password = emp.EmpPass;//Providing Password to Encrypt
                ObjEnc.saltValue = "sALtValue";
                ObjEnc.passwordIterations = 7;
                ObjEnc.initVector = "~1B2c3D4e5F6g7H8";
                ObjEnc.keySize = 256;
                string encPassword = ObjEnc.Encrypt(ObjEnc);
                #endregion 
                //Updating the new password as encrypted value in db
                var entity = entities.usp_UpdateEmployee(x, x.ToString(), HttpContext.Current.Session["UserEmail"].ToString(), encPassword, false);
                if (entity != null)
                    return Request.CreateResponse(HttpStatusCode.Created, entity);
                else
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Updation of password failed");
            }

            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "OTP did not match");
            }
        }


        [HttpPost, Route("api/Reset/SendOTP")]
        public HttpResponseMessage SendOTP(Employee e)
        {
            var emailID_lowercase = e.EmailID.ToLower();
            HttpContext.Current.Session["UserEmail"] = e.EmailID;  // session of email ID final

            var entity = entities.usp_EmailValidate(emailID_lowercase).ToList();
            string resultStore = entity[0];
            if (entity != null && resultStore == "Email Exist")
            {

                #region SendOTP
                var CharPool = "0123456789";
                var stringChars = new char[6];
                var random = new Random();

                for (int i = 0; i < stringChars.Length; i++)
                {
                    stringChars[i] = CharPool[random.Next(CharPool.Length)];
                }
                #endregion
                System.Web.HttpContext.Current.Session["GeneratedOTP"] = new String(stringChars);
                try
                {
                    SendEmail send = new SendEmail();
                    System.Web.HttpContext.Current.Session["OTPTimeStamp"] = DateTime.Now;
                    //Send Email with OTP valid for 15 mins
                    int x = send._SendEmail("no-reply@qfun.com", System.Web.HttpContext.Current.Session["UserEmail"].ToString(),"OTP for password reset" ,"Hi,<br><br>The OTP for resetting the password is : "+ System.Web.HttpContext.Current.Session["GeneratedOTP"] +"<br><br>Regards,<br>RYM Team");

                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                #region ErrorHandling
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Error Sending Email");
                }

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid EmailID");
            }
            #endregion
        }
    }
}
