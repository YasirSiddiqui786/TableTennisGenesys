using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Net.Mail;


namespace TableTennis.Controllers
{
    public class LoginController : ApiController
    {
        GenesysProjectEntities entities = new GenesysProjectEntities();


        [HttpPost]
        public HttpResponseMessage validate(Employee emp)
        {
            string encPassword;
            var emailID_lowercase = emp.EmailID.ToLower();
            HttpContext.Current.Session["UserEmail"] = emp.EmailID;  // session of email ID final
            #region
            Encrypt_Decrypt ObjEnc = new Encrypt_Decrypt();
            ObjEnc.Password = emp.EmpPass;//Providing Password to Encrypt
            ObjEnc.saltValue = "sALtValue";
            ObjEnc.passwordIterations = 7;
            ObjEnc.initVector = "~1B2c3D4e5F6g7H8";
            ObjEnc.keySize = 256;
            encPassword = ObjEnc.Encrypt(ObjEnc);// Converting the password to an encrypted one
            #endregion
            var entity = entities.usp_LoginValidate(emailID_lowercase, encPassword).ToList();
            var entity1 = entity[0].Split(':').ToArray();
            string resultStore = entity1[0];
            if (entity1.Length == 2)
            {
                string EmpNameLogin = entity1[1];
                HttpContext.Current.Session["UserName"] = EmpNameLogin;
            }
            if (entity != null && resultStore == "Match")
            {


                return Request.CreateResponse(HttpStatusCode.OK, entity[0]);

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid Username/Password");
            }

        }
       
       
    }
}
