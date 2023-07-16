import React from 'react';
import * as XLSX from 'xlsx';

const convertJsonToExcel = (jsonData) => {
    // Prepare data in the required format for Excel
    const excelData = jsonData.response.map((item) => ({
        'Project Name': item.ProjectName,
        'MessageCount': item.MessageCount,
        'SmsMessageCount': item.SmsMessageCount,
        'MessageTitle': item.MessageTitle,
        'VoiceMessageCount': item.VoiceMessageCount,
        'Recipient Counts': item.Recipients.length,
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelFile = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

    const fileName = 'data.xlsx'; 
    const buffer = new ArrayBuffer(excelFile.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < excelFile.length; i++) {
        view[i] = excelFile.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    // Create a download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
};

const DemoExcelGenerator = () => {
    const jsonData = {
        "response": [
            {
                "ProjectID": "de622045-5bf8-49c3-8d1e-d3b0041fd846",
                "ProjectName": "Daniel Tenkorang",
                "ProjectDescription": "Testing of Projects",
                "MessageCount": 1,
                "SmsMessageCount": 1,
                "VoiceMessageCount": 0,
                "MessageID": "476befff-c646-4841-9538-e4c13b833256",
                "MessageTitle": "Test Campaign",
                "IsVoice": false,
                "IsSms": true,
                "Sender": "d12f0969-4201-4f79-9257-31c9f89443f4",
                "GroupID": null,
                "Recipients": [
                    "0206243499572",
                    "0206299534272",
                    "02062992323572",
                    "020634342299572",
                    "0er34206299572322",
                    "05584wer85290",
                    "0534355266897",
                    "02062234399572",
                    "05552668934347",
                    "02343406299572",
                    "02343406299572",
                    "02034346299572",
                    "02062993434572",
                    "0206293454339572",
                    "05584834343435290",
                    "02097343343439442",
                    "05552342266897",
                    "020622342399572"
                ],
                "UserID": "bdeb91d5-a671-4756-b5e0-469b8197a399",
                "Content": "Test SMS message. July 14, 2023",
                "VoiceMsg": "",
                "MsgLanguage": "",
                "IsScheduled": false,
                "ScheduledDate": "2023-07-15 11:45",
                "ScheduledType": "Fixed"
            },
            {
                "ProjectID": "181f75bf-92b8-4b78-b83d-923057359538",
                "ProjectName": "Test Project",
                "ProjectDescription": "",
                "MessageCount": 1,
                "SmsMessageCount": 1,
                "VoiceMessageCount": 0,
                "MessageID": "6f253d31-8d08-47f9-bc46-735da057889b",
                "MessageTitle": "Test Campaign",
                "IsVoice": false,
                "IsSms": true,
                "Sender": "d12f0969-4201-4f79-9257-31c9f89443f4",
                "GroupID": null,
                "Recipients": [
                    "055234384852342290"
                ],
                "UserID": "bdeb91d5-a671-4756-b5e0-469b8197a399",
                "Content": "Test SMS message. July 14, 2023",
                "VoiceMsg": "",
                "MsgLanguage": "",
                "IsScheduled": false,
                "ScheduledDate": "2023-07-15 11:48",
                "ScheduledType": "Fixed"
            }
        ]
    };

    const handleClick = () => {
        // Call the function to convert JSON to Excel
        convertJsonToExcel(jsonData);
    };

    return (
        <div>
            <button onClick={handleClick}>Generate Excel File</button>
        </div>
    );
};

export default DemoExcelGenerator;
