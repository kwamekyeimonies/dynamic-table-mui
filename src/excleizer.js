import React from 'react';
import XLSX from 'xlsx';

function ExcelGenerator() {
  const data = [
    {
      "serial": 15,
      "recipient": "0558485290",
      "status": "ANSWERED",
      "answer_time": "2023-08-18 20:37:36",
      "hang_up_time": "2023-08-18 20:37:58",
      "retries": "0",
      "date_sent": "2023-08-18 20:38:08",
      "duration": 0
    },
    {
      "serial": 16,
      "recipient": "0558485290",
      "status": "not_dialed_yet",
      "answer_time": "",
      "hang_up_time": "",
      "retries": "0",
      "date_sent": "2023-08-18 20:32:27",
      "duration": 0
    }
  ];

  const generateExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }); // Use type: 'array' instead of type: 'blob'

    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = 'data.xlsx';

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // For IE browser
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      // For modern browsers
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  return (
    <div>
      <button onClick={generateExcel}>Generate Excel</button>
    </div>
  );
}

export default ExcelGenerator;
