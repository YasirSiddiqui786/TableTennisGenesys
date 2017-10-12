using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.SessionState;
using System.Web.Http;
using TableTennis;

public partial class Pages_Login : System.Web.UI.Page


{

    protected void Page_Init()
    {
        HttpContext.Current.Session["UserName"] = null;
        
    }
    
}
