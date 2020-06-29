async function GetTemplateResponse(request, state, logger) {

    var fs = require('fs');
    var path = require('path');
    var csv = require('csvtojson');
    var converter = require('xml-js');
    var {
        response,
        balRecForFound,
        balRecForNotFound
    } = require(path.join(__dirname, "../../../DynamicData/responseStructure.js"));

    var requestObject = request.body;
    var reqJSON = await converter.xml2json(requestObject, {
        compact: true,
        spaces: 4
    });
    var reqjs = JSON.parse(reqJSON);
    // if(reqjs[`soapenv:Envelope`][`soapenv:Body`]["a:BalInqRq"].BalRef.AcctIdent[0].AcctIdentType._text === "AcctId"){
    //     var accountID= reqjs["soapenv:Envelope"]["soapenv:Body"]["a:BalInqRq"].BalRef.AcctIdent[0].AcctIdentValue._text;
    //     console.log(accountID);
    // }
    var csvFile = path.join("DynamicData", "Files", "LokupData.csv");
    var csvJSONFile = await csv().fromFile(csvFile);


    const reqID = reqjs["soapenv:Envelope"][`soapenv:Body`][`a:BalInqRq`][`RqUID`]._text;
    console.log(reqID);

    // const accountID =  reqjs["soapenv:Envelope"][`soapenv:Body`][`a:BalInqRq`][`BalRef`][0][`AcctRef`][`AcctInfo`][`AcctIdent`][0][`AcctIdentValue`]._text;
    const accountRef = reqjs["soapenv:Envelope"][`soapenv:Body`][`a:BalInqRq`][`BalRef`];
    const accountLength = accountRef.length;

    let balRec = [];
    let isFound = 0;

    for (var i = 0; i < accountLength; i++) {
        const accountID = accountRef[i][`AcctRef`][`AcctInfo`][`AcctIdent`][0][`AcctIdentValue`]._text;
        const data = csvJSONFile.find(obj => obj.AcctId === accountID);
        if (data) {
            var balRecForFound = balRecForFound;
            balRecForFound[`BalInfo`][`AcctRef`][`AcctInfo`][`AcctIdent`][0][`AcctIdentValue`]._text = data.AcctId;
            balRecForFound[`BalInfo`][`AcctBal`][0][`CurAmt`][`Amt`]._text = data.Current;
            balRecForFound[`BalInfo`][`AcctBal`][1][`CurAmt`][`Amt`]._text = data.Avail;
            balRecForFound[`BalInfo`][`AcctBal`][2][`CurAmt`][`Amt`]._text = data.CreditLimit;
            balRecForFound[`BalInfo`][`AcctBal`][3][`CurAmt`][`Amt`]._text = data.Ledger;
            balRecForFound[`BalInfo`][`AcctBal`][4][`CurAmt`][`Amt`]._text = data.OpeningAvail;
            balRecForFound[`BalInfo`][`AcctBal`][5][`CurAmt`][`Amt`]._text = data.IntBal;
            balRecForFound[`BalInfo`][`AcctBal`][6][`CurAmt`][`Amt`]._text = data.AvailableFund;
            balRecForFound[`BalStatus`][`BalStatusCode`]._text = data.BalStatusCode;
            balRecForFound[`AcctStatus`][`AcctStatusCode`]._text = data.AcctStatusCode;
            balRec = [...balRec, ...[balRecForFound]]
            isFound = isFound+1;
        } else {
            var balRecForNotFound = balRecForNotFound;
            balRecForNotFound[`BalInfo`][`AcctRef`][`AcctInfo`][`AcctIdent`][0][`AcctIdentValue`]._text = accountID;
            balRecForNotFound[`BalStatus`][`BalStatusCode`]._text = "NotAvail";
            balRecForNotFound[`AcctStatus`][`AcctStatusCode`]._text = "Closed";
            balRec = [...balRec, ...[balRecForNotFound]]
        }
    }

    response = response;
    response["soapenv:Envelope"][`soapenv:Body`][`ns2:BalInqRs`][`RqUID`]._text = reqID;
    response["soapenv:Envelope"][`soapenv:Body`][`ns2:BalInqRs`][`BalRec`] = balRec;
    if(!isFound) {
        // NotFound
        response["soapenv:Envelope"][`soapenv:Body`][`ns2:BalInqRs`][`Status`][`Severity`][`_text`] = "Warning" ;
        response["soapenv:Envelope"][`soapenv:Body`][`ns2:BalInqRs`][`Status`][`StatusDesc`][`_text`] = "Partial Success";
    }
    else if(isFound === accountLength) {
        // Success
        response["soapenv:Envelope"][`soapenv:Body`][`ns2:BalInqRs`][`Status`][`Severity`][`_text`] = "Info";
        response["soapenv:Envelope"][`soapenv:Body`][`ns2:BalInqRs`][`Status`][`StatusDesc`][`_text`] = "Success";
    }
    else {
        // Partial Success
        response["soapenv:Envelope"][`soapenv:Body`][`ns2:BalInqRs`][`Status`][`Severity`][`_text`] = "Warning";
        response["soapenv:Envelope"][`soapenv:Body`][`ns2:BalInqRs`][`Status`][`StatusDesc`][`_text`] = "Partial Success";

    }

    /* Prepare Response Body */
    var options = {
        compact: true,
        ignoreComment: true,
        spaces: 4
    };
    var resp = converter.json2xml(response, options);


    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8'
        },
        body: resp
    };
}