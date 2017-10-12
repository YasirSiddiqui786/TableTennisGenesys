<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Register.aspx.cs" Inherits="Pages_Login" %>

<asp:content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
</head>
<body>
    <div class="container" id="registerForm">
        <div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10">
        <div class="well">
            <!--This table contains the fields that we want to capture to register a new user-->
            <table class="table borderless" id="registerTable">
                <thead>
                    <tr>
                        <th class="tableHeader">New User Registration
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <label>Email ID<span class="required"> *</span></label>
                            <%--<input type="text" id="txtEmail" class="form-control" placeholder="Email ID" />--%>
                            <%--<div class="loader"></div>--%>
                            <div class="input-group">
                                    <input type="text" id="txtEmail" class="form-control" placeholder="Email ID" />
                                    <div class="input-group-btn">
                                        <button type="button" id= "btnvalidateEmail" class="btn btn-default" title="Validate Email ID">
                                             <span class="fa fa-spinner"></span>
                                        </button>
                                    </div>
                          </div>
                            <div id="validateEmailBox">
                                <%--<button id= "btnvalidateEmail" class="btn btn-xs pull-right" onclick="" >Validate</button>--%>
                                <label>Enter the OTP received on above Email address<span class="required"> *</span></label>
                                <input type="text" id= "txtValidateOTP" class="form-control" placeholder="OTP" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Name<span class="required"> *</span></label>
                            <input type="text" id="txtName" class="form-control" placeholder="Your Name" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Employee ID<span class="required"> *</span></label>
                            <input type="text" id="txtEmpID" class="form-control" placeholder="Employee ID" />
                        </td>
                    </tr>
                    

                    <tr>
                        <td>
                            <label>Password<span class="required"> *</span></label>
                            <input type="password" id="txtPassword" class="form-control" placeholder="Password" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Confirm Password<span class="required"> *</span></label>
                            <input type="password" id="txtConfPassword" class="form-control" placeholder="Confirm Password" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input id="btnRegister" class="btn btn-primary btnLong" type="button" value="Sign Up" /></td>
                    </tr>
                    <tr><td><div id="signInLink"><a href="Login.aspx">Sign In</a></div></td></tr>
                </tbody>
            </table>

            <!--Bootstrap modal dialog that shows up when regsitration is successful-->
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
                                <h4 class="modal-title">Registration Successful!</h4>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button onclick="window.location.href = 'Login.aspx'" class="btn btn-success"
                                    data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!--Bootstrap alert to display any validation errors-->
            <div id="divError" class="alert alert-danger collapse">
                <a id="linkClose" href="#" class="close">&times;</a>
                <div id="divErrorText"></div>
            </div>
        </div>
    </div>
</div>

    <script src="../Scripts/Validation.js"></script>
    <script src="../Scripts/Register.js"></script>
</body>
</html>
</asp:content>