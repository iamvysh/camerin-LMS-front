import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Box, Typography, Card, CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";

const StudentLibrary = () => {
    const [books, setBooks] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('/getallbook');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleOpenModal = (bookId) => {
        setSelectedBookId(bookId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleProceed = async () => {
        try {
            const studentId = localStorage.getItem("studentId");
            await axios.post(`/requestbook/${selectedBookId}/${studentId}`, {
                startDate,
                endDate
            });
            setOpenModal(false);
            toast.success("Request  created Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
        
        } catch (error) {
            console.error('Error requesting book:', error);
            toast.error(error.response.data.message, {
                duration: 3000,
                style: {
                  borderRadius: "10px",
                  background: "#e24242",
                  color: "#fff",
                },
              });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap:"4" }}>
            <Typography variant="h4" gutterBottom>
                Books
            </Typography>
            {books.map((book) => (
                <Card key={book?.id} sx={{ minWidth: 275, marginBottom:10}}>
                    <CardContent sx={{ padding: '20px' }}>
                        <Typography variant="h5" component="div">
                            {book?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Available Copies: {book?.availiableCopies}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Category: {book?.category}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleOpenModal(book?._id)}>Get</Button>
                    </CardActions>
                </Card>
            ))}
           
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Book Request</DialogTitle>
                <DialogContent>
                <br />
                      <br />
                    <TextField
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                      <br />
                      <br />
                    <TextField
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                </DialogContent>
                <DialogActions>
                  
                    <Button onClick={handleCloseModal}>Cancel</Button>
                  
                    <Button onClick={handleProceed} color="primary">Proceed</Button>
                </DialogActions>
            </Dialog>
            <Toaster />
        </Box>
    );
};

export default StudentLibrary;


