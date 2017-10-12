var loginMatched = "Match";
var loginInvalidPswrd = "Incorrect Password";
var loginInvalidEmail = "Invalid EmailID";

$(document).ready(function () {

    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    $("#txtPassword ").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnLogin").click();
        }
    });

    $('#btnLogin').click(function () {
        $('#divError').hide();
        var userEmail = $('#txtUsername').val();
        var userpswrd = $('#txtPassword').val();

        var validEmail = Validate.validateEmail(userEmail);
        var validPswrd = Validate.validatePassword(userpswrd);

        if (validEmail === 1 && validPswrd === 1) {
            $.ajax({
                // Post username, password & the grant type to /token
                url: '/api/login/validate',
                method: 'POST',
                //  contentType: 'application/json',
                data: {
                    EmailID: userEmail,
                    EmpPass: userpswrd,
                    // grant_type: 'password'
                },

                success: function (response) {
                    sessionStorage.setItem("accessToken", response.access_token);
                    var result = response.toString();
                    if (result.indexOf(loginMatched) !== -1) {
                        //$("#userName").text(result.split("").splice(result.indexOf(":") + 1, result.length).join(""));
                        setUserName();
                        window.location.href = "BookSlot.aspx";
                    }
                    else {
                        $('#divErrorTitle').text("Invalid Credentials");
                        $('#divErrorDesc').text("Username or Password incorrect");
                        $('#divError').show('fade');
                    }
                
                },
                // Display errors if any in the Bootstrap alert <div>
                error: function (jqXHR) {
                    $('#divErrorTitle').text(jqXHR.statusText);
                    $('#divErrorDesc').text(jqXHR.responseJSON.message + " " + jqXHR.responseJSON.exceptionMessage);
                    $('#divError').show('fade');
                }
            });
        }
        else if (validEmail !== 1) {
            $('#divErrorTitle').text("Invalid Credentials");
            $('#divErrorDesc').text(validEmail);
            $('#divError').show('fade');
        }
        else {
            $('#divErrorTitle').text("Invalid Credentials");
            $('#divErrorDesc').text(validPswrd);
            $('#divError').show('fade');
        }
    });



    $('#btnForgotPass').click(function () {
        $('#divError').hide();
       
        window.location.href = "ResetPassword.aspx";

             
    });
   
});