<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="BookSlot.aspx.cs" Inherits="Pages_Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder4" runat="server">
     
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title></title>
    </head>
    <body>
        <div class="container" id="bookSlotForm">
            <div class="col-lg-10 col-lg-offset-1 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">

                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#newBooking">Book Now</a></li>
                    <li><a data-toggle="tab" href="#updateBooking">Update Booking</a></li>
                    <li><a data-toggle="tab" href="#history">Booking History</a></li>
                </ul>
                <div class="well" id="tab-container">
                    <div class="tab-content">

                        <div id="newBooking" class="tab-pane fade in active">
                            <table class="table borderless">
                                <thead>
                                    <tr><th></th></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="form-inline">
                                            <label>Choose Date</label>
                                            <div class="form-group pull-right  datepickerContainer">
                                                <div class='input-group date datepicker' id='datetimepickerNewBook'>
                                                    <input type='text' id="selectDateNewBook" class="form-control" />
                                                    <span class="input-group-addon">
                                                     <span class="glyphicon glyphicon-calendar"></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="form-group">
                                            <label>Choose Slot</label>
                                            <dl class="slotLegendBox">
                                                <dt class="unavlSlot"></dt><dd>Unavailable</dd>
                                                <dt class="avlSlot"></dt><dd>Available</dd>
                                                <dt class="prefAvlSlot"></dt><dd>Preferred Available</dd>
                                                <dt class="fullyBookedSlot"></dt><dd>Fully Booked</dd>
                                                <dt class="bookedSlot"></dt><dd>Selected</dd>
                                            </dl>

                                            <div class="container">
                                                <div class="loadingIcon"><span class="fa fa-spinner fa-spin"></span></div>
                                                <div id="slotboxContainerNewBook" class="btn-group" data-toggle="buttons">
                                                </div>
                                            </div>

                                            <div class ="useStatus">You are left with 4 slot(s) for today</div>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="btnClear" class="btn btn-primary btnLong pull-right" onclick="clearSlot()" type="button" value="Clear" />
                                            <input id="btnBook" class="btn btn-success btnLong pull-right" onclick="bookSlot()" type="button" value="Book" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                        <div id="updateBooking" class="tab-pane fade">

                            <table class="table borderless">
                                <thead>
                                    <tr><th></th></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="form-inline">
                                            <label>Choose Date</label>
                                            <div class="form-group pull-right datepickerContainer">
                                                <div class='input-group date datepicker' id='datetimepickerUpdate'>

                                                  <div class="input-group-btn">
                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" id = "btn-dateDropdown"  aria-expanded="false">
                                                      <span class="caret"></span>
                                                    </button>
                                                    <ul id="dateDropdown" class="dropdown-menu">

    	                                            </ul>
                                                  </div>
                                                  <input type='text' id="selectDateUpdate" class="form-control" />
	                                            <span class="input-group-addon">
        	                                            <span class="glyphicon glyphicon-calendar"></span>
                                                    </span>
                                                </div>
                                                    <!---->

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="form-group">
                                            <label>Choose Slot</label>
                                            <dl class="slotLegendBox">
                                                <dt class="unavlSlot"></dt><dd>Unavailable</dd>
                                                <dt class="avlSlot"></dt><dd>Available</dd>
                                                <dt class="prefAvlSlot"></dt><dd>Preferred Available</dd>
                                                <dt class="fullyBookedSlot"></dt><dd>Fully Booked</dd>
                                                <dt class="bookedSlot"></dt><dd>Selected</dd>
                                            </dl>

                                            <div class="container">
                                                <div class="loadingIcon"><span class="fa fa-spinner fa-spin"></span></div>
                                                <div id="slotboxContainerUpdate" class="btn-group" data-toggle="buttons">
                                                </div>
                                            </div>

                                            <div class ="useStatus">You are left with 4 slot(s) for today</div>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input id="btnRefresh" class="btn btn-primary btnLong pull-right" type="button" onclick ="storeSessionTab()" value="Refresh" />
                                            <input id="btnSave" class="btn btn-success btnLong pull-right" type="button" onclick ="updateSlotBooking()" value="Save" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        
                        </div>

                        <div id="history" class="tab-pane fade">
                            <div class="loadingIcon"><span class="fa fa-spinner fa-spin"></span></div>
                            <div class="table-responsive">
                                <table id="historyTable" class="display table table-responsive nowrap" style="width:100%">
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

                            <!--Bootstrap modal dialog that shows up when regsitration is successful-->
            <div class="modal fade" tabindex="-1" id="statusModal" data-keyboard="false" data-backdrop="static">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" onclick="storeSessionTab()">
                                &times;
                            </button>
                            <h3 class="modal-title" id="modal-title">Booking Successful</h3>
                        </div>
                        <div class="modal-body">
                            <form>
                                <h4 class="modal-title" id="modal-Desc">Your slot(s) are booked successfuly</h4>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button id="btnClose" onclick="storeSessionTab()"" class="btn btn-success" data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>


        <%--<form runat="server"><asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true" /></form>--%>
         <script type="text/javascript">
             var weeklyData = JSON.parse(<%= "'" + weeklyData + "'"%>);
             var currentDateData = JSON.parse(<%= "'" + currentDateData + "'"%>); 
             var dateNow = JSON.parse(<%= "'" + dateNow + "'"%>); 
             var bookedDateData = (<%= "'" + bookedDateData + "'"%>); 
             var bookingHistoryData = JSON.parse(<%= "'" + bookingHistoryData + "'"%>); 
         </script>
        
        <script src="../Scripts/ObjectStore.js"></script>
        <script src="../Scripts/BookSlot.js"></script>
    </body>
    </html>
</asp:Content>
