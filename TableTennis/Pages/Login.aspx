<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Pages_Login" %>

<asp:content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
<html xmlns="http://www.w3.org/1999/xhtml">
<body>
    <div class="container" id="loginForm">
         <div class="container" id="genCarouselContainer" style="display:none;">
            <div id="genCarousel" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#genCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#genCarousel" data-slide-to="1"></li>
                    <li data-target="#genCarousel" data-slide-to="2"></li>
                </ol>

                <!-- Wrapper for slides -->
                <div class="carousel-inner">
                    <div class="item active">
                        <img src="../Images/1.png" alt="Los Angeles" />
                    </div>

                    <div class="item">
                        <img src="../Images/2.png" alt="Chicago" />
                    </div>

                    <div class="item">
                        <img src="../Images/5.png" alt="New York" />
                    </div>
                </div>

                <!-- Left and right controls -->
                <a class="left carousel-control" href="#genCarousel" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#genCarousel" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>

        <div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10">
        <div class="well">
            <!--Table to capture username and password-->
            <table class="table borderless" id="loginTable">
                <thead>
                    <tr>
                        <th class="tableHeader">Login Into Your Account
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>
                        <label>Username</label>
                        <input type="text" id="txtUsername" class="form-control" placeholder="Username" />
                    </td></tr>
                    <tr><td>
                        <label>Password</label>
                        <input type="password" id="txtPassword" class="form-control" placeholder="Password" />
                    </td></tr>
                    <tr><td><div id="forgotPswrd"><a href="ResetPassword.aspx">Forgot Password?</a></div></td></tr>
                    <tr><td><input id="btnLogin" class="btn btn-success btnLong" type="button" value="Sign In" /></td></tr>
                    <%--<tr><td><input id="btnForgotPass" class="btn btn-success btnLong" type="button" value="Forgot Password" /></td></tr>--%>
                     <tr><td><a href="Register.aspx" class="btn btn-primary btnLong">Sign Up</a></td>
                    </tr>
                </tbody>
            </table>
            <!--Bootstrap alert to display error message if the login fails-->
            <div id="divError" class="alert alert-danger collapse">
                <a id="linkClose" href="#" class="close">&times;</a>
                <div id="divErrorTitle"></div>
                <div id="divErrorDesc"></div>
            </div>
        </div>
    </div>

    </div>

    <script src="../Scripts/Validation.js"></script>
    <script src="../Scripts/Login.js"></script>
</body>
</html>
</asp:content>