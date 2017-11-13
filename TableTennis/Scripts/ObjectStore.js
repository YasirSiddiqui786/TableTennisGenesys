if (typeof (ObjStore) === "undefined") {
    var ObjStore = {},
        objectStore;
    
    ObjStore.openDB = function () {
        if (window.indexedDB) {

            request = window.indexedDB.open("slotdb", 2);
            request.onerror = function (event) {
                console.log("Error opening DB", event);
            }
            request.onupgradeneeded = function (event) {
                console.log("Upgrading");
                db = event.target.result;

                objectStore = db.createObjectStore("weeklyslottable", { keyPath: "slotID" });
                objectStore.createIndex("date", "date", { unique: false });

                objectStore = db.createObjectStore("historytable", { keyPath: "sqnum" });
                //objectStore.createIndex("date", "date", { unique: false });
            };
            request.onsuccess = function (event) {
                console.log("Success opening DB");
                db = event.target.result;

                // Clear all the data form the object store
                ObjStore.clearData("weeklyslottable");
                ObjStore.clearData("historytable");
                functionCallee();
            }
        }
    }

    ObjStore.addSlotRecord = function (slotID, slotDate, empName, isAvailable, seatsAvailable, time) {

        var transaction = db.transaction(["weeklyslottable"], "readwrite");
        transaction.oncomplete = function (event) {
            console.log("addSlotRecord transaction: Success :)");
            //functionCallee2();
        };

        transaction.onerror = function (event) {
            console.log("addSlotRecord transaction: Error :( :" + transaction.error);
        };
        var objectStore = transaction.objectStore("weeklyslottable");

        objectStore.add({ slotID: slotID, date: slotDate, empName: empName, isAvailable: isAvailable, seatsAvailable: seatsAvailable, time: time });
    }

    ObjStore.getRecordBySlotID = function (slotID) {
        var request = db.transaction(["weeklyslottable"], "readwrite").objectStore("weeklyslottable").get(slotID);
        request.onsuccess = function (event) {
            console.log(request.result);
        };
    };

    ObjStore.getRecordBySlotDate = function (slotDate, callbackFunc, argArr) {

        var objectStore = db.transaction(["weeklyslottable"], "readwrite").objectStore("weeklyslottable");
        var index = objectStore.index("date");
        var resultArr = [];
        var resultObj = {};

        index.openCursor(IDBKeyRange.bound(slotDate, slotDate)).onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                //console.log("Name: " + cursor.key + ", Value: " + cursor.value.slotID);
                resultObj = {};
                resultObj.EmpName = cursor.value.empName;
                resultObj.IsAvailable = cursor.value.isAvailable;
                resultObj.SeatsAvailable = cursor.value.seatsAvailable;
                resultObj.SlotID = cursor.value.slotID;
                resultObj.Time = cursor.value.time;
                resultArr.push(resultObj);
                cursor.continue();
            }
            else {
                callbackFunc(resultArr, argArr[0], argArr[1]);
            }
        };
       // return resultArr;
    };

    ObjStore.addHistoryRecord = function (sqnum, slotDate, playedWith, tableID, time, updatedDate, nthLastWeek) {

        var transaction = db.transaction(["historytable"], "readwrite");
        transaction.oncomplete = function (event) {
            console.log("addHistoryRecord transaction: Success :)");
        };

        transaction.onerror = function (event) {
            console.log("addHistoryRecord transaction: Error :( :" + transaction.error);
        };
        var objectStore = transaction.objectStore("historytable");

        objectStore.add({ sqnum: sqnum, date: slotDate, playedWith: playedWith, tableID: tableID, time: time, updatedDate: updatedDate, nthLastWeek: nthLastWeek });
    }

    ObjStore.getHistoryRecord = function (lenMenu, callbackFunc) {
        var request = db.transaction(["historytable"], "readwrite").objectStore("historytable").getAll();
        request.onsuccess = function (event) {
            console.log(request.result);
            var resultArr = [];
            var resultSubArr = [];
            for (var i = 0; i < request.result.length; i++) {
                resultSubArr = [request.result[i].sqnum, request.result[i].date, request.result[i].time, request.result[i].playedWith, request.result[i].updatedDate];
                resultArr.push(resultSubArr);
            }
            callbackFunc(lenMenu, resultArr);
            //console.log(resultArr);
            //return resultArr;
        }
        //var objectStore = db.transaction(["historytable"], "readwrite").objectStore("historytable");
        ////var index = objectStore.index("sqnum");
        //var resultArr = [];
        //var resultSubArr = [];

        //objectStore.openCursor().onsuccess = function (event) {
        //    var cursor = event.target.result;
        //    if (cursor) {
        //        //console.log("Name: " + cursor.key + ", Value: " + cursor.value.slotID);
        //        resultSubArr = [cursor.value.sqnum, cursor.value.date, cursor.value.time, cursor.value.playedWith, cursor.value.updatedDate];
        //        resultArr.push(resultSubArr);
        //        cursor.continue();
        //    }
        //    else {
        //        return resultArr;
        //    }
        //};
        // return resultArr;
    };


    ObjStore.clearData = function(tblName) {
        // open a read/write db transaction, ready for clearing the data
        var transaction = db.transaction([tblName], "readwrite");

        // report on the success of the transaction completing, when everything is done
        transaction.oncomplete = function (event) {
            console.log(tblName + " transaction: Success :)");
        };
        transaction.onerror = function (event) {
            console.log(tblName + " objectStoreRequest: Error :( :" + transaction.error);
        };

        // create an object store on the transaction
        var objectStore = transaction.objectStore(tblName);
        // Make a request to clear all the data out of the object store
        var objectStoreRequest = objectStore.clear();
        objectStoreRequest.onsuccess = function (event) {
            console.log(tblName + " Clear objectStoreRequest: Success :)");
        };
    };

    ObjStore.deleteRecord = function () {
        db.transaction(["weeklyslottable"], "readwrite").objectStore("weeklyslottable").delete(rollNo);
    }

    ObjStore.updateRecord = function () {
        var rollNo = $("#rollno").val();
        var name = $("#name").val();
        var transaction = db.transaction(["students"], "readwrite");
        var objectStore = transaction.objectStore("students");
        var request = objectStore.get(rollNo);
        request.onsuccess = function (event) {
            $("#result").html("Updating : " + request.result.name + " to " + name);
            request.result.name = name;
            objectStore.put(request.result);
        };
    };
};
