var weeklySortedData = {};
var sortedHistoryData = [];

$(document).ready(function () {

    $(".caption").show();
    $("#forgotPswrd").show();
    $("#Logout").show();

    setUserName();

    // Date picker functions for NewBook
    var newBooktxtbox = $("#selectDateNewBook");
    newBooktxtbox.val("");
    $('#datetimepickerNewBook').datetimepicker({
        format: 'DD-MM-YYYY',
        defaultDate: new Date(),
        minDate: moment().millisecond(0).second(0).minute(0).hour(0),
        maxDate: moment().add(6, 'days')
    });
    // Render SlotBox on date selection from NewBook tab's calendar
    $('#datetimepickerNewBook').on("dp.change", function (e) {
        var selectedDate = newBooktxtbox.val().toString();
        var selectedDateObj = weeklySortedData[selectedDate];
        sessionStorage.setItem('selectedSlot', "");
        renderSlotBox(selectedDateObj, '#slotboxContainerNewBook', 'nbSlot');
    });

    // Date picker functions for Uopdate Booking
    var updatetxtbox = $("#selectDateUpdate");
    updatetxtbox.val("");
    $('#datetimepickerUpdate').datetimepicker({
        format: 'DD-MM-YYYY',
        defaultDate: new Date(),
        minDate: moment().millisecond(0).second(0).minute(0).hour(0),
        maxDate: moment().add(7, 'days')
    });
    // Render SlotBox on date selection from Update Booking tab's calendar
    $('#datetimepickerUpdate').on("dp.change", function (e) {
        if (e.date._i.toString() !== $("#selectDateUpdate").val().toString()) {
            sessionStorage.setItem('selectedSlot', "");
            renderSlotBox(weeklySortedData[$("#selectDateUpdate").val().toString()], '#slotboxContainerUpdate', 'ubSlot');
        }
    });

    // Render slotbox
    //renderSlotBox(currentDateData, '#slotboxContainerNewBook', 'nbSlot');
    // Render updateOptions
    
    sortWeeklyData(weeklyData);

    rederUpdateOptionBox();

    renderHistoryTable();

    refreshTab();

});

function clearSlot() {
    var activeTabID = $("div.active")[0].id,
        selectedDate = $("#" + activeTabID + " input[type=text]").val();

    if (activeTabID === "newBooking") {
        renderSlotBox(weeklySortedData[selectedDate], '#slotboxContainerNewBook', 'nbSlot');
    }
    else if (activeTabID === "updateBooking") {
        renderSlotBox(currentDateData, '#slotboxContainerNewBook', 'nbSlot');
        renderSlotBox(weeklySortedData[selectedDate], '#slotboxContainerUpdate', 'ubSlot');
    }
    sessionStorage.setItem('selectedSlot', "{}");

}

function refreshTab() {
    var currentTabID, currentDate;
    var activeTabID = $("div.active")[0].id,
        selectedDate = $("#" + activeTabID + " input[type=text]").val();
    currentTabID = sessionStorage.currentTabID ? JSON.parse(sessionStorage.currentTabID) : activeTabID;
    currentDate = sessionStorage.currentDate ? JSON.parse(sessionStorage.currentDate) : selectedDate;

    if (currentTabID && currentDate) {

        if (currentTabID === "newBooking") {
            renderSlotBox(weeklySortedData[currentDate], '#slotboxContainerNewBook', 'nbSlot');
            renderSlotBox(currentDateData, '#slotboxContainerUpdate', 'ubSlot');
        }
        else if (currentTabID === "updateBooking") {
            renderSlotBox(currentDateData, '#slotboxContainerNewBook', 'nbSlot');
            renderSlotBox(weeklySortedData[currentDate], '#slotboxContainerUpdate', 'ubSlot');
        }

        $('.nav-tabs a[href="#' + currentTabID + '"]').tab('show');
        $("#" + currentTabID + " input[type=text]").val(currentDate);

        sessionStorage.setItem('currentTabID', "");
        sessionStorage.setItem('currentDate', "");
    }
}

// Function to render SlotBox with given slot parameters and containerID
function renderSlotBox(slotObj, containerID, tabID) {

    var counter = 0;
    var container = $(containerID);
    var slotList = "";
    var displayType, slotboxID, slotTime, slotStatus, slotCount, isDisabled, slotCategory, slotPlayers, isChecked;
    var slotCase = 0;
    //var activeTabID = $("div.active")[0].id;

    for (counter = 0; counter < slotObj.length; counter++) {
        slotboxID = slotObj[counter].SlotID;
        slotTime = slotObj[counter].Time.split(":")[0] + ":" + slotObj[counter].Time.split(":")[1];
        slotCategory = parseInt(slotObj[counter].IsAvailable, 10);
        slotCount = parseInt(slotObj[counter].SeatsAvailable, 10);
        slotCase = slotCount;
        slotPlayers = "";
        if (slotCategory === -1) {
            slotCase = 5;
        }
        else if (slotCategory === 2) {
            slotCase = 6;
        }
        else if (slotCategory === 3) {
            slotCase = 7;
        }
        if (slotObj[counter].EmpName) {
            slotPlayers = slotObj[counter].EmpName.split(",").join(", ");
        }
        // On the basis of slotcount customize the slot UI and render slotboxes
        switch (slotCase) {
            case 0:
                displayType = "fullyBookedSlot";
                isChecked = "";
                isDisabled = "disabled";
                slotStatus = `Fully Booked`; break;
            case 1:
            case 3:
                displayType = "prefAvlSlot";
                isChecked = "";
                isDisabled = "";
                slotStatus = `Available (${slotCount})`; break;
                //slotStatus = `Available (<span class="blink_me">${4 - slotCount}</span>)`; break;
            case 2:
            case 4:
                displayType = "avlSlot";
                isChecked = "";
                isDisabled = "";
                slotStatus = `Available (${slotCount})`; break;
            case 5:
            case 7:
                displayType = "unavlSlot";
                isChecked = "";
                isDisabled = "disabled";
                slotStatus = `UnAvailable`; break;
            case 6:
                if (tabID === "ubSlot") {
                    displayType = "bookedSlot active";
                    isChecked = "";
                    isDisabled = "";
                    slotStatus = `Available (${slotCount})`; break
                }
                else {
                    displayType = "bookedSlot active";
                    isChecked = "";
                    isDisabled = "readOnly";
                    slotStatus = `Booked`; break
                }
            default:
                displayType = "avlSlot";
                isChecked = "";
                isDisabled = "";
                slotStatus = `Available (${slotCount})`; break;
        }

        slotList += `<label class="btn slotbox ${displayType}" title ="${slotPlayers}" ${isDisabled} ><input id="${tabID}_${slotboxID}" type="checkbox" ${isChecked} onchange="selectSlot(this)" data-category=${slotCategory} /><span class="slotTime"></span>${slotTime}<br /><span class="slotStatus">${slotStatus}</span></label>`;
    }
    container.empty();
    container.append(slotList);

    // To store booked slots in session
    var updateTabID = "updateBooking";
    var bookedSlot = $("#" + updateTabID + " *[data-category='2']")[0] ? $("#" + updateTabID + " *[data-category='2']") : [];
    var bookedUnavlSlot = $("#" + updateTabID + " *[data-category='3']")[0] ? $("#" + updateTabID + " *[data-category='3']") : [];
    var bookedSlotObj = {};
    var slotID = "";
    var selectedDate = $("#" + updateTabID + " input[type=text]").val();
    if (bookedSlot[0]) {
        bookedSlotObj[selectedDate] = [];
        for (var i = 0; i < bookedSlot.length; i++) {
            slotID = bookedSlot[i].id;
            slotID = slotID.substring(slotID.indexOf("_") + 1, slotID.length);
            bookedSlotObj[selectedDate].push(parseInt(slotID, 10));
        }
    }
    sessionStorage.setItem('bookedSlot', JSON.stringify(bookedSlotObj));
    var activeBookedSlot = $("div.active *[data-category='2']");
    var activeBookedUnavlSlot = $("div.active *[data-category='3']");
    for (var v = 0; v < $(".useStatus").length; v++)
        $(".useStatus")[v].innerHTML = `You are left with <b>${4 - (activeBookedSlot.length + activeBookedUnavlSlot.length)}</b> slot(s) for current date`;

    // Validate selected checkboxes for maximum limit on first loading
    validateSlot("first");
}

// Render Existing booking list on Update Booking tab
function rederUpdateOptionBox() {

    //sortWeeklyData(weeklyData);

    var i;
    var container = $("#dateDropdown");
    var optionList = "";
    var dateID;
    var bookedDateOptionList = JSON.parse(bookedDateData).length ? JSON.parse(bookedDateData) : "";
    if (bookedDateOptionList) {
        for (i = 0; i < bookedDateOptionList.length; i++) {
            dateID = getDateForDateNumber(bookedDateOptionList[i]);
            optionList += `<li><a href="#">${dateID}</a></li>`;
        }
        container.append(optionList);
    }
    else {
        $("#btn-dateDropdown").attr('disabled', 'disabled');
    }
    sessionStorage.setItem('selectedSlot', "");
    // renderSlotBox(currentDateData, '#slotboxContainerUpdate', 'ubSlot');

    // Render SlotBox on date selection from NewBook tab's calendar
    $('#dateDropdown li').on("click", function (e) {
        e.preventDefault();
        var dateString;
        var parts;
        var newDate, oldDate;
        if (e.target.text) {
            parts = e.target.text.split('-');
            newDate = new Date(parts[2], parts[1], parts[0]);
            dateString = `${(newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate()}-${(newDate.getMonth() < 10) ? '0' + newDate.getMonth() : newDate.getMonth()}-${newDate.getFullYear()}`;
            oldDate = $("#selectDateUpdate").val();
            $("#selectDateUpdate").val(dateString);
            if (dateString.toString() !== oldDate.toString()) {
                sessionStorage.setItem('selectedSlot', "");
                renderSlotBox(weeklySortedData[dateString], '#slotboxContainerUpdate', 'ubSlot');
            }

        }
    });
}

function renderHistoryTable() {

    var lenMenu = sortHistoryData(bookingHistoryData);

    $('#historyTable').dataTable({
        data: sortedHistoryData,
        columns: [
            { title: "Sr. No." },
            { title: "Date" },
            { title: "Time" },
            { title: "Played With" },
            { title: "Last Updated On" }
        ],
        "lengthMenu": [lenMenu, ["Last 1 Week", "Last 2 Weeks", "Last 3 Weeks", "Last 1 Month"]],
        "pageLength": 10
    });
}

function sortWeeklyData(weeklyData) {
    var dateObj = {}, dateID;
    for (var i = 0; i < weeklyData.length; i++) {
        dateID = getDateForDateNumber(weeklyData[i].Date);
        //dateStr = parseInt(weeklyData[i].Date.replace("/Date(", "").replace(")/", ""), 10);
        //dateStr = new Date(dateStr);
        //dateID = `${dateStr.getDate()}-${(parseInt(dateStr.getMonth(), 10) + 1 < 10) ? ('0' + (parseInt(dateStr.getMonth(), 10) + 1)) : (parseInt(dateStr.getMonth(), 10) + 1)}-${dateStr.getFullYear()}`;
        dateObj = {
            IsAvailable: weeklyData[i].IsAvailable,
            SeatsAvailable: weeklyData[i].SeatsAvailable,
            SlotID: weeklyData[i].SlotID,
            Time: weeklyData[i].Time,
            EmpName: weeklyData[i].EmpName

        }
        if (!weeklySortedData[dateID]) {
            weeklySortedData[dateID] = [];
        }
        //weeklySortedData[dateID][weeklyData[i].SlotID] = dateObj;
        weeklySortedData[dateID].push(dateObj);
    }
}

function sortHistoryData(bookingHistoryData) {
    var dataItem = [], bookingDateID, updatedDateID;
    var lw1 = 0, lw2 = 0, lw3 = 0, lw4 = 0;
    for (var i = 0; i < bookingHistoryData.length; i++) {

        bookingDateID = getDateForDateNumber(bookingHistoryData[i].Date);
        //bookingDateStr = parseInt(bookingHistoryData[i].Date.replace("/Date(", "").replace(")/", ""), 10);
        //bookingDateStr = new Date(bookingDateStr);
        //bookingDateID = `${bookingDateStr.getDate()}-${(parseInt(bookingDateStr.getMonth(), 10) + 1 < 10) ? ('0' + (parseInt(bookingDateStr.getMonth(), 10) + 1)) : (parseInt(bookingDateStr.getMonth(), 10) + 1)}-${bookingDateStr.getFullYear()}`;

        updatedDateID = getDateForDateNumber(bookingHistoryData[i].UpdatedDate);
        //updatedDateStr = parseInt(bookingHistoryData[i].UpdatedDate.replace("/Date(", "").replace(")/", ""), 10);
        //updatedDateStr = new Date(updatedDateStr);
        //updatedDateID = `${updatedDateStr.getDate()}-${(parseInt(updatedDateStr.getMonth(), 10) + 1 < 10) ? ('0' + (parseInt(updatedDateStr.getMonth(), 10) + 1)) : (parseInt(updatedDateStr.getMonth(), 10) + 1)}-${updatedDateStr.getFullYear()}`;


        dataItem = [i + 1, bookingDateID, bookingHistoryData[i].Time.substring(0, 5), bookingHistoryData[i].PlayedWith ? bookingHistoryData[i].PlayedWith : "None", updatedDateID];
        sortedHistoryData.push(dataItem);

        switch (bookingHistoryData[i].nthLastWeek) {
            case 'LW1':
                ++lw1; break;
            case 'LW2':
                ++lw2; break;
            case 'LW3':
                ++lw3; break;
            case 'LW4':
                ++lw4; break;
        }
    }
    return [lw1 ? lw1 : -1, lw2 ? lw1 + lw2 : -1, lw3 ? lw1 + lw2 + lw3 : -1, lw4 ? lw1 + lw2 + lw3 + lw4 : -1];
}

function selectSlot(element, flag) {
    var slotStatus;
    var modify;
    var cancelledSlot = [];
    if (element) {
        var activeTabID = $("div.active")[0].id,
        bookedSlot = $("#" + activeTabID + " *[data-category='2']")[0] ? $("#" + activeTabID + " *[data-category='2']") : [],
        bookedUnavlSlot = $("#" + activeTabID + " *[data-category='3']")[0] ? $("#" + activeTabID + " *[data-category='3']") : [],
        maxlimit = 4 - (bookedSlot.length + bookedUnavlSlot.length);
        if ($(element).parent().is('[readonly]') || (maxlimit === 0 && element.checked)) {
            $(element).parent().addClass('active');
        }
        else {
            // Update slotStatus on checkbox click event
            slotStatus = $(element).parent().find(".slotStatus").text();
            modify = parseInt(slotStatus[slotStatus.indexOf("(") + 1], 10);

            if (element.checked) {
                slotStatus = slotStatus.replace(modify, --modify);
            }
            else if ($(element)[0].dataset.category.toString() == "2" && activeTabID === "updateBooking") {
                slotStatus = slotStatus.replace(modify, ++modify);
                $(element).parent().removeClass('bookedSlot').addClass(modify % 2 ? 'prefAvlSlot' : 'avlSlot');
                $(element)[0].dataset.category = "1";
                $(element)[0].checked = false;
                cancelledSlot = JSON.parse(sessionStorage.cancelledSlot) === "[]" ? [] : JSON.parse(sessionStorage.cancelledSlot);
                cancelledSlot.push(element.id);
                sessionStorage.setItem('cancelledSlot', JSON.stringify(cancelledSlot));
            }
            else {
                slotStatus = slotStatus.replace(modify, ++modify);
            }
            $("#" + element.id).parent().find(".slotStatus").text(slotStatus);

            // Validate selected checkboxes for maximum limit
            if (!flag && flag !== "final") {
                validateSlot($("#" + element.id)[0]);
            }
        }
    }

};

function validateSlot(ele) {
    var activeTabID = $("div.active")[0].id,
        selectedSlot = $("#" + activeTabID + " .slotbox input:checked")[0] ? $("#" + activeTabID + " .slotbox input:checked") : [],
        bookedSlot = $("#" + activeTabID + " *[data-category='2']")[0] ? $("#" + activeTabID + " *[data-category='2']") : [],
        bookedUnavlSlot = $("#" + activeTabID + " *[data-category='3']")[0] ? $("#" + activeTabID + " *[data-category='3']") : [],
        maxlimit = 4 - (bookedSlot.length + bookedUnavlSlot.length),
        selectedDate = $("#" + activeTabID + " input[type=text]").val(),
        selectedSlotObj = {},
        deselect;
    // On first loading of checkboxes
    if (ele.toString() === "first") {
        if (selectedSlot[0]) {
            selectedSlotObj[selectedDate] = [];
            for (var i = 0; i < selectedSlot.length; i++) {
                selectedSlotObj[selectedDate].push(selectedSlot[i].id);
            }
        }
        // Save selected checkboxes in Session storage
        sessionStorage.setItem('selectedSlot', JSON.stringify(selectedSlotObj));
        sessionStorage.setItem('cancelledSlot', JSON.stringify([]));
    }
    else if (ele.type === "checkbox") {

        selectedSlotObj = JSON.parse(sessionStorage.selectedSlot) === "{}" ? {} : JSON.parse(sessionStorage.selectedSlot);
        selectedSlotList = selectedSlotObj[selectedDate] ? selectedSlotObj[selectedDate] : [];

        if ((selectedSlotList.length === maxlimit) && (selectedSlotList.indexOf(ele.id) === -1) && (selectedSlotList.length <= 4)) {

            // Deselect first slotbox to maintain maximum slot booking limit to 3
            deselect = selectedSlotList[0];
            // Update SlotList in session storage
            selectedSlotList = selectedSlotList.splice(1, selectedSlotList.length);
            selectedSlotList.push(ele.id);
            selectedSlotObj[selectedDate] = selectedSlotList;

            $(`#${deselect}`)[0].checked = false;
            $(`#${deselect}`).parent().removeClass("active");
            selectSlot($(`#${deselect}`)[0], "final");
        }
        else if ((selectedSlotList.indexOf(ele.id) === -1) && ($(ele)[0].checked) && (selectedSlotList.length <= 4)) {
            selectedSlotList.push(ele.id);
            selectedSlotObj[selectedDate] = selectedSlotList;
        }
        else if ((selectedSlotList.indexOf(ele.id) !== -1) && !($(ele)[0].checked)) {
            selectedSlotList.splice(selectedSlotList.indexOf(ele.id), 1);
            selectedSlotObj[selectedDate] = selectedSlotList;
        }

        // Save selected checkboxes in Session storage
        sessionStorage.setItem('selectedSlot', JSON.stringify(selectedSlotObj));
    }

}

function getDateForDateNumber(dateNumberStr) {
    var dateID, dateStr;
    dateStr = parseInt(dateNumberStr.replace("/Date(", "").replace(")/", ""), 10);
    //dateStr = Date(dateStr);
    dateStr = new Date(dateStr);
    dateID = `${(parseInt(dateStr.getDate(), 10) < 10) ? ('0' + (parseInt(dateStr.getDate(), 10))) : (parseInt(dateStr.getDate(), 10))}-${(parseInt(dateStr.getMonth(), 10) + 1 < 10) ? ('0' + (parseInt(dateStr.getMonth(), 10) + 1)) : (parseInt(dateStr.getMonth(), 10) + 1)}-${dateStr.getFullYear()}`;
    return dateID;
}

function storeSessionTab() {
    var currentTabID = $("div.active")[0].id;
    var currentDate = $("#" + currentTabID + " input[type=text]").val();
    sessionStorage.setItem('currentTabID', JSON.stringify(currentTabID));
    sessionStorage.setItem('currentDate', JSON.stringify(currentDate));
    window.location.reload();
}

function bookSlot() {
    var activeTabID = $("div.active")[0].id;
    var selectedSlot = $("#" + activeTabID + " .slotbox input:checked");
    var bookedSlot = [];
    var slotID = "";
    for (var i = 0; i < selectedSlot.length; i++) {
        slotID = selectedSlot[i].id.toString();
        slotID = slotID.substring(slotID.indexOf("_") + 1, slotID.length);
        bookedSlot.push(parseInt(slotID, 10));
    }
    if (bookedSlot.length <= 4) {
        $.ajax({
            // Post username, password & the grant type to /token
            url: '/api/bookslot/book',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(bookedSlot),
            type: JSON,
            success: function (response) {
                if (response[0] === "Booked") {
                    $("#modal-title")[0].innerHTML = "Booking Successful";
                    $("#modal-Desc")[0].innerHTML = "Your slot(s) are booked successfuly";
                    $('#statusModal').modal('show');
                }
            },
            // Display errors if any in the Bootstrap alert <div>
            error: function (jqXHR) {
                $('#modal-title').text(jqXHR.statusText);
                $('#modal-Desc').text(jqXHR.responseJSON.message + " " + jqXHR.responseJSON.exceptionMessage);
                $('#statusModal').modal('show');
            }
        });
    }
}

function updateSlotBooking() {
    var activeTabID = $("div.active")[0].id;
    var selectedSlot = $("#" + activeTabID + " .slotbox input:checked");
    var selectedDate = $("#" + activeTabID + " input[type=text]").val();
    var bookedSlot = [];
    var cancelledSlot = [];
    var data;
    var slotID = "";
    var prevBookedSlotObj = JSON.parse(sessionStorage.bookedSlot) === "{}" ? {} : JSON.parse(sessionStorage.bookedSlot);
    var prevBookedSlotList = prevBookedSlotObj[selectedDate] ? prevBookedSlotObj[selectedDate] : [];
    var cancelledSlotList = JSON.parse(sessionStorage.cancelledSlot) ? JSON.parse(sessionStorage.cancelledSlot) : [];

    for (var i = 0; i < selectedSlot.length; i++) {
        slotID = selectedSlot[i].id.toString();
        slotID = slotID.substring(slotID.indexOf("_") + 1, slotID.length);
        bookedSlot.push(parseInt(slotID, 10));
    }
    for (var i = 0; i < cancelledSlotList.length; i++) {
        slotID = cancelledSlotList[i].toString();
        slotID = slotID.substring(slotID.indexOf("_") + 1, slotID.length);
        if (bookedSlot.indexOf(slotID) === -1) {
            cancelledSlot.push(parseInt(slotID, 10));
        }
    }
    //data = { bookedSlot, cancelledSlot };
    data = [bookedSlot.join(",") + ":" + cancelledSlot.join(",")];

    $.ajax({
        // Post username, password & the grant type to /token
        url: '/api/Bookslot/update',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        //data: data,
        type: JSON,
        success: function (response) {
            if (response.indexOf("Cancelled") === 0 || response.indexOf("Booked") === 0) {
                $("#modal-title")[0].innerHTML = "Changes Saved";
                $("#modal-Desc")[0].innerHTML = "Bookings updated successfuly";
                $('#statusModal').modal('show');
            }
        },
        // Display errors if any in the Bootstrap alert <div>
        error: function (jqXHR) {
            $('#modal-title').text(jqXHR.statusText);
            //$('#modal-Desc').text(jqXHR.responseJSON.message + " " + jqXHR.responseJSON.exceptionMessage);
            $('#modal-Desc').text("Test Message ");
            $('#statusModal').modal('show');
        }
    });

}

//function HandleBackFunctionality() {
//    if (window.event.clientX < 40 && window.event.clientY < 0) {
//        alert("Browser back button is clicked...");
//    }
//}
window.onbeforeunload = function () {
    //blah blah blah
    console.log("Browser back button is clicked...");

}

