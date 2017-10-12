<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="SessionTimeOut.aspx.cs" Inherits="Pages_Login" %>

<asp:content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta name="viewport" content="width=device-width" />
    <title>Error</title>

    <link href="/Content/bootstrap.min.css" rel="stylesheet" />
    <link href="/Content/Common.css" rel="stylesheet" />
</head>
<body>
    <%--<div class="page-header">
        <img src="/Images/GEN_id_color_rev_rgb.png" id="logo" class="img-responsive img-thumbnail pull-left" alt="Responsive image" />
    </div>--%>

    <p style="margin-left: 20px">Your session has expired. Please try to <a href="Login.aspx">login</a> again.</p>

   <%-- <div class="page-footer page-row"><div class="footerText">Copyright © 2017 Genesys. All rights reserved.</div></div>--%>

    <script src="/Scripts/jquery-1.10.2.min.js"></script>
    <script src="/Scripts/bootstrap.min.js"></script>

</body>
</html>
</asp:content>