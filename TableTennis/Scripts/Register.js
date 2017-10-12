$(document).ready(function () {

    //Close the bootstrap alert
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    $("#txtConfPassword ").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnRegister").click();
        }
    });
    $("#registerTable input[type=text]").change(function () {
        var userEmail = $('#txtEmail').val();
        var validateBtn = $('#btnvalidateEmail span');
        if (userEmail !== "" && !(validateBtn.hasClass("fa-times-circle") || validateBtn.hasClass("fa-times-circle"))) {
            $('#btnvalidateEmail').click();
        }
    })

    // Save the new user details
    $('#btnRegister').click(function () {
        $('#divError').hide();
        var userEmail = $('#txtEmail').val();
        var userpswrd = $('#txtPassword').val();
        var userempID = $('#txtEmpID').val();
        var username = $('#txtName').val();
        var usercnfpswrd = $('#txtConfPassword').val();
        var userOTP = $('#txtValidateOTP').val();


        var validEmail = userEmail ? Validate.validateEmail(userEmail) : 0;
        var validPswrd = userpswrd ? Validate.validatePassword(userpswrd) : 0;
        var validEmpID = userempID ? Validate.validateEmpID(userempID) : 0;
        var validName = username ? Validate.validateName(username) : 0;
        var validCnfPswrd = usercnfpswrd ? Validate.validateConfirmPswrd(userpswrd, usercnfpswrd) : 0;
        var validOTP = userOTP ? Validate.validateOTP(userOTP) : 0;

        if (validEmail === 1 && validPswrd === 1 && validEmpID === 1 && validName === 1 && validCnfPswrd === 1 && validOTP === 1 ) {
            $.ajax({
                url: '/api/register/reg',
                method: 'POST',
                data: {
                
                    EmpName: username,
                    EmpID: userempID,
                    EmailID: userEmail,
                    EmpPass: userpswrd,
                    IsOrganiser: '0',
                    OTP: userOTP
                },
                success: function (response) {
                    console.log(response);
                    $('#divError').hide();
                    if (response[0] === "Inserted") {
                        $('#successModal').modal('show');
                    }
                    else if(response[0] === "Exist") {
                        $('#divErrorText').text("User account already exist");
                        $('#divError').show('fade');
                    }
                   
                },
                error: function (jqXHR) {
                    $('#divErrorText').text(jqXHR.responseText);
                    $('#divError').show('fade');
                }
            });
        }
        else {
            var errorItem = [validName, validEmpID, validEmail, validOTP, validPswrd, validCnfPswrd];
            //var errorItemID = [validName, validEmpID, validEmail, validPswrd, validCnfPswrd];
            for(e in errorItem){
                if (errorItem[e] === 0) {
                    $('#divErrorText').text("Please fill requied fields");
                    $('#divError').show('fade');
                    break;
                }
                else if (errorItem[e] !== 1) {
                    $('#divErrorText').text(errorItem[e]);
                    $('#divError').show('fade');
                    break;
                }
            }
        }
    });

    
    $('#btnvalidateEmail').click(function () {

        var userEmail = $('#txtEmail').val();
        var validateBtn = $('#btnvalidateEmail span');

        $('#divError').hide();

        validateBtn.removeClass("fa-spin fa-check-circle fa-times-circle required").addClass("fa fa-spinner");

        if (!userEmail && userEmail === "") {
            $('#divErrorText').text("Enter an Email ID to validate");
            $('#divError').show('fade');
        }
        else {
            validateBtn.addClass("fa-spin");

            var validEmail = userEmail ? Validate.validateEmail(userEmail) : 0;
            if (validEmail === 1) {
                $.ajax({
                    url: '/api/Register/IsExistingMail',
                    method: 'POST',
                    data: {
                        EmailID: userEmail
                    },
                    success: function (response) {
                        if (response[0] != "Valid") {
                            validateBtn.removeClass("fa-spinner fa-spin fa-times-circle required").addClass("fa-check-circle");
                            $('#validateEmailBox').show('fade');
                        }
                        else {
                            validateBtn.removeClass("fa-spinner fa-spin fa-check-circle").addClass("fa-times-circle required");
                            $('#divErrorText').text("User account already exist");
                            $('#divError').show('fade');
                        }

                    },
                    error: function (jqXHR) {
                        validateBtn.removeClass("fa-spin fa-check-circle fa-times-circle required").addClass("fa fa-spinner");
                        $('#divErrorText').text(JSON.parse(jqXHR.responseText).message ? JSON.parse(jqXHR.responseText).message : JSON.parse(jqXHR.responseText));
                        $('#divError').show('fade');
                    }
                });
            }
            else if (validEmail !== 1) {
                $('#divErrorText').text(validEmail);
                $('#divError').show('fade');
                validateBtn.removeClass("fa-spinner fa-spin fa-check-circle").addClass("fa-times-circle required");
                //validateBtn.removeClass("fa-spin fa-check-circle fa-times-circle required").addClass("fa fa-spinner");
            }

        }
    });
});
