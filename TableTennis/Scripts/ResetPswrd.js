$(document).ready(function () {

    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });
    
    $("#txtResetUsername").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnSendOTP").click();
        }
    });

    $('#otpExist').click(function () {

        $('#divError').hide();
        var userEmail = $('#txtResetUsername').val();
        var validEmail = userEmail ? Validate.validateEmail(userEmail) : 0;
        if (validEmail !== 1) {
            $('#divErrorText').text(validEmail.toString() === "0" ? "Please fill Email ID" : validEmail.toString());
            $('#divError').show('fade');
        }
        else {
            $("#sendOTPTable").hide();
            // $("#resetPswrdTable").removeClass("col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2").addClass("col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3");
            $("#resetPswrdTable").show();
            setUserEmail(userEmail);
        }
    });


    $('#btnSendOTP').click(function () {

        $('#divError').hide();
        var userEmail = $('#txtResetUsername').val();
        var validEmail = userEmail ? Validate.validateEmail(userEmail) : 0;
        if (validEmail === 1) {

            $('#btnSendOTP span').addClass("fa fa-spinner fa-spin");
            $('#btnSendOTP')[0].disabled = true;

            $.ajax({
                url: '/api/Reset/SendOTP',
                method: 'POST',
                data: {
                    EmailID: userEmail
                },
                success: function (response) {
                    $("#sendOTPTable").hide();
                    //$("#resetPswrdTable").removeClass("col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2").addClass("col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3");
                    $("#resetPswrdTable").show();
                    setUserEmail();
                    $('#btnSendOTP span').removeClass("fa fa-spinner fa-spin");
                    $('#btnSendOTP')[0].disabled = false;
                },
                error: function (jqXHR) {
                    $('#divErrorText').text(jqXHR.responseText);
                    $('#divError').show('fade');
                    $('#btnSendOTP span').removeClass("fa fa-spinner fa-spin");
                    $('#btnSendOTP')[0].disabled = false;
                }
            });
        }
        else {
            validEmail = validEmail.toString() === "0" ? "Please fill Email ID" : validEmail.toString();
            $('#divErrorText').text(validEmail);
            $('#divError').show('fade');
        }
    });

    $('#btnResetPswrd').click(function () {
        $('#divError').hide();

        var userOTP = $('#txtOTP').val();
        var userpswrd = $('#txtNewPassword').val();
        var usercnfpswrd = $('#txtCnfrmNewPassword').val();
        var validPswrd = userpswrd ? Validate.validatePassword(userpswrd) : 0;
        var validCnfPswrd = usercnfpswrd ? Validate.validateConfirmPswrd(userpswrd, usercnfpswrd) : 0;

        if (validPswrd === 1 && validCnfPswrd === 1) {
            $.ajax({
                url: '/api/Reset/UpdatePass',
                method: 'POST',
                data: {
                    OTP: userOTP,
                    EmpPass: userpswrd
                },
                success: function (response) {
                    console.log(response);
                    $('#divError').hide();

                    $('#successModal').modal('show');
                    //window.location.href = "Login.aspx";


                },
                error: function (jqXHR) {
                    $('#divErrorText').text(jqXHR.responseText);
                    $('#divError').show('fade');
                }
            });
        }
        else if (validPswrd !== 1) {
            $('#divErrorText').text(validPswrd);
            $('#divError').show('fade');
        }
        else {
            $('#divErrorText').text(validCnfPswrd);
            $('#divError').show('fade');
        }

    });
});