<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Pages_Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <body>
        <div class="container" id="resetPswrdForm">
            <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12" id="resetPswrdFormContainer">
<%--            <div class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12" id="resetPswrdFormContainer">--%>

                <div class="well">
                    <!--Table to capture username and password-->
                    <table class="table borderless" id="sendOTPTable">
                        <thead>
                            <tr>
                                <th class="tableHeader">Reset Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="form-inline">
                                    <label>Email ID<span class="required"> *</span></label>
                                    <input type="text" id="txtResetUsername" class="form-control" placeholder="" />
                                </td>
                            </tr>
                            <tr>
                                <td class="resetEmailDescp">You will receive an OTP on above Email address</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="otpExist"><a id="otpExist" href="#">I already have an OTP</a></div>
                                    <div class="btn-container pull-right">
                                        <a href="Login.aspx" id="cancelSendOTP" class="btn btn-primary btnMid pull-right">Cancel</a>
                                        <%--<input id="btnSendOTP" class="btn btn-success btnMid pull-right" type="button" value="Send OTP" />--%>
                                        <button id="btnSendOTP" class="btn btn-success btnMid pull-right" value="Send OTP">
                                            Send OTP<span class=""></span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="table borderless" id="resetPswrdTable">
                        <thead>
                            <tr>
                                <th class="tableHeader">Reset Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="form-inline">
                                    <label class="col-lg-offset-1">Email ID<span class="required"> *</span></label>
                                    <input type="text" id="txtUserEmail" class="form-control" placeholder="" disabled="disabled"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="form-inline">
                                    <label class="col-lg-offset-1">Enter OTP<span class="required"> *</span></label>
                                    <input type="text" id="txtOTP" class="form-control" placeholder="OTP" />
                                </td>
                            </tr>
                            <tr>
                                <td class="form-inline">
                                    <label class="col-lg-offset-1">New Password<span class="required"> *</span></label>
                                    <input type="password" id="txtNewPassword" class="form-control" placeholder="New Password" />
                                </td>
                            </tr>
                            <tr>
                                <td class="form-inline">
                                    <label class="col-lg-offset-1">Confirm Password<span class="required"> *</span></label>
                                    <input type="password" id="txtCnfrmNewPassword" class="form-control" placeholder="Confirm Password" />
                                </td>
                            </tr>
                            <tr>
                                <td class="col-lg-6">
                                    <a href="Login.aspx" id="cancelResetPswrd" class="btn btn-primary btnLong btnMid pull-right ">Cancel</a>
                                    <input id="btnResetPswrd" class="btn btn-success btnLong btnMid pull-right" type="button" value="Reset" /></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="modal fade" tabindex="-1" id="successModal" data-keyboard="false" data-backdrop="static">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" onclick="window.location.href = 'Login.aspx'">
                                        &times;
                                    </button>
                                    <h3 class="modal-title">Success</h3>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <h4 class="modal-title">Password changed successfully.</h4>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button onclick="window.location.href = 'Login.aspx'" class="btn btn-success"
                                            data-dismiss="modal">
                                        SignIn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--Bootstrap alert to display error message if the login fails-->
                    <div id="divError" class="alert alert-danger collapse">
                        <a id="linkClose" href="#" class="close">&times;</a>
                        <div id="divErrorText"></div>
                    </div>
                </div>
            </div>

        </div>
        <script>
            function setUserEmail(email)
            {
                var userEmail = $("#txtUserEmail");
                userEmail.val(email ? email : <%= "'" + Session["UserEmail"] + "'"%>);
            }
            
        </script>
        <script src="../Scripts/ResetPswrd.js"></script>
        <script src="../Scripts/Validation.js"></script>
    </body>
    </html>
</asp:Content>
