// import React from 'react'
// export default function StudentReturnBooks() {
//   return (
//     <div>studentReturnBooks</div>
//   )
// }


import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const StudentReturnBooks = () => {
    const [transactions, setTransactions] = useState([]);

    console.log('first',transactions)

  
        const fetchTransactions = async () => {
            try {
              const studentId = localStorage.getItem("studentId")
                const response = await axios.get(`/getbookstatus/${studentId}`);
                setTransactions(response.data.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching unapproved transactions:', error);
            }
        };

        useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Book Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Get Request</TableCell>
                            <TableCell>Late Fine</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions?.map((transaction) => (
                            <TableRow key={transaction._id}>
                                <TableCell>{transaction?.bookid?.title}</TableCell>
                                <TableCell>{transaction?.startDate?.slice(0, 10)}</TableCell>
                                <TableCell>{transaction?.endDate?.slice(0, 10)}</TableCell>
                                <TableCell>
                                    {transaction.isApproved ? <span style={{color:"green"}}>APPROVED</span> : <span style={{color:"red"}}>NOT APPROVED</span>}
                                </TableCell>
                                 <TableCell>{transaction?.fine}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudentReturnBooks;


