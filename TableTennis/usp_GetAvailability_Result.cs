//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TableTennis
{
    using System;
    
    public partial class usp_GetAvailability_Result
    {
        public System.DateTime Date { get; set; }
        public int SlotID { get; set; }
        public string Time { get; set; }
        public Nullable<int> SeatsAvailable { get; set; }
        public int IsAvailable { get; set; }
        public string EmpName { get; set; }
    }
}