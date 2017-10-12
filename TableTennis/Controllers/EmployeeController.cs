using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;

namespace TableTennis.Controllers
{
    public class EmployeeController : ApiController
    {
        GenesysProjectEntities entities = new GenesysProjectEntities();
        public IEnumerable<usp_GetAllEmployee_Result> Get()
        {
            return entities.usp_GetAllEmployee().ToList();
        }
        
        public IEnumerable<usp_GetEmployee_Result> Get(long id)
        {
            return entities.usp_GetEmployee(id).AsEnumerable();
        }


    }
}
