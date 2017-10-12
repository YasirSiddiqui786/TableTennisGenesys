if (typeof (Validate) === "undefined") {
    var Validate = {
        validateEmail: function (email) {
            var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var errorMsg = "Email ID is not valid";
            return regx.test(email) ? 1 : errorMsg;
        },
        validatePassword: function (password) {
            var regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
            var errorMsg = "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
            return regx.test(password) ? 1 : errorMsg;
        },
        validateName: function (name) {
            var regx = /^[a-zA-Z ]*$/;
            var errorMsg = "Name should contain alphabets only";
            return regx.test(name) ? 1 : errorMsg;
        },
        validateEmpID: function (empID) {
            var regx = /^(\d{7}|\d{8})$/;
            var errorMsg = "Employee ID is not valid";
            return regx.test(empID) ? 1 : errorMsg;
        },
        validateConfirmPswrd: function (pswrd, confirmPswrd) {
            var errorMsg = "Please enter the same Password as above";
            return pswrd === confirmPswrd ? 1 : errorMsg;
        },
        validateOTP: function (opt) {
            var regx = /\d{6}/;
            var errorMsg = "OTP is not valid";
            return regx.test(opt) ? 1 : errorMsg;
        }
    };
};