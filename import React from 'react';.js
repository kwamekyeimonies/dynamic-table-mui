import React from 'react';

const Table = ({ data }) => {
    // Extract unique question names for headers
    const headers = Array.from(new Set(data.map(item => item.question_name)));

    // Create a mapping of question names to response arrays
    const responseMap = {};
    data.forEach(item => {
        responseMap[item.question_name] = item.responses.map(response => response.response);
    });

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Responses</th>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data[0].responses.map((_, responseIndex) => (
                    <tr key={responseIndex}>
                        <td>Response {responseIndex + 1}</td>
                        {headers.map((header, headerIndex) => (
                            <td key={headerIndex}>{responseMap[header][responseIndex]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
