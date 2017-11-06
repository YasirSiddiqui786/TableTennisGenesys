using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;


namespace TableTennis.Controllers
{
    public class RegisterController : ApiController
    {
        GenesysProjectEntities entities = new GenesysProjectEntities();


        [HttpPost, Route("api/Register/IsExistingMail")]
        public HttpResponseMessage IsExistingMail(Employee emp)
        {
            var emailID_lowercase = emp.EmailID.ToLower();
            HttpContext.Current.Session["UserEmail"] = emp.EmailID;  // session of email ID final
            Employee objOTP = new Employee(); ;
            objOTP.EmailID = emp.EmailID;
            var entity = entities.usp_EmailValidate(emailID_lowercase).ToList();
            string resultStore = entity[0];
            if (entity != null && resultStore != "Email Exist")
            {

                RegisterController objRC = new RegisterController();
                objRC.SendRegisterOTP(objOTP);
                return Request.CreateResponse(HttpStatusCode.OK);

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Existing EmailID");
            }
        }


        [HttpPost, Route("api/Register/reg")]
        public HttpResponseMessage reg(Employee emp)
        {
            if (System.Web.HttpContext.Current.Session["GeneratedOTP"].Equals(emp.OTP.ToString()))
            {
                var emailID_lowercase = emp.EmailID.ToLower();
                string encPassword;
                var empname_Corrected = new System.Globalization.CultureInfo("en-US", false).TextInfo.ToTitleCase(emp.EmpName.ToLower());
                //Module for Encryption
                #region EncryptPassword
                Encrypt_Decrypt ObjEnc = new Encrypt_Decrypt();
                ObjEnc.Password = emp.EmpPass;
                ObjEnc.saltValue = "sALtValue";
                ObjEnc.passwordIterations = 7;
                ObjEnc.initVector = "~1B2c3D4e5F6g7H8";
                ObjEnc.keySize = 256;
                encPassword = ObjEnc.Encrypt(ObjEnc);// Converting the password to an encrypted one
                #endregion
                var entity = entities.usp_RegEmployee(emp.EmpID, empname_Corrected, emailID_lowercase, encPassword, emp.IsOrganiser);
                if (entity != null)
                {
                    // HttpContext.Current.Session["UserID"] = emp.EmailID;//Just to check the value entered here is getting recieved in login page or not
                    return Request.CreateResponse(HttpStatusCode.Created, entity);

                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Employee not found");
                }
            }
            else return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Incorrect OTP");
        }

        public void SendRegisterOTP(Employee e)
        {

            var emailID_lowercase = e.EmailID.ToLower();
            HttpContext.Current.Session["UserEmail"] = e.EmailID;  // session of email ID final

            var entity = entities.usp_EmailValidate(emailID_lowercase).ToList();
            var CharPool = "0123456789";
            var stringChars = new char[6];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = CharPool[random.Next(CharPool.Length)];
            }

            System.Web.HttpContext.Current.Session["GeneratedOTP"] = new String(stringChars);


            SendEmail send = new SendEmail();
            System.Web.HttpContext.Current.Session["OTPTimeStamp"] = DateTime.Now;
            int x = send._SendEmail("no-reply@qfun.com", System.Web.HttpContext.Current.Session["UserEmail"].ToString(), "Registration OTP", "Hi, The OTP for registration is : " + System.Web.HttpContext.Current.Session["GeneratedOTP"]);

        }


    }
}

