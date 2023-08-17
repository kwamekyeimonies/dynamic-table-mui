import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination
} from '@mui/material';

const DynamicTable = ({ data }) => {
    if (data.length === 0) {
        return <p>No data available.</p>;
    }

    const rowsPerPage = 5; // Number of rows to display per page
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(0)

    const headers = Array.from(new Set(data.map(item => item.question_name)));
    const responseMap = {};
    data.forEach(item => {
        responseMap[item.question_name] = item.responses.map(response => response.response);
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data[0].responses.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((_, responseIndex) => (
                            <TableRow key={responseIndex}>
                                {headers.map((header, headerIndex) => (
                                    <TableCell key={headerIndex}>{responseMap[header][responseIndex]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data[0].responses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </div>
    );
};

export default DynamicTable;
