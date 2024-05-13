
import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
const AprovedTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    console.log('first',transactions)

  
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/getnotdispachedtransactions');
                setTransactions(response?.data?.data);
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
            <Typography variant="h4" gutterBottom>
                approved Transactions
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Book Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions?.map((transaction) => (
                            <TableRow key={transaction?._id}>
                                <TableCell>{transaction?.studentid?.userFullName}</TableCell>
                                <TableCell>{transaction?.bookid?.title}</TableCell>
                                <TableCell>{transaction?.startDate.slice(0, 10)}</TableCell>
                                <TableCell>{transaction?.endDate.slice(0, 10)}</TableCell>
                                <TableCell>
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AprovedTransactions;

