import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Box, Typography, Card, CardContent, CardActions, Button,Grid } from '@mui/material';

const ViewBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
             
                const response = await axios.get('/getallbooktolibrarian');
                setBooks(response.data.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Book List
            </Typography>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid item key={book?.id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ minWidth: 275, marginBottom: 10,marginLeft:15 }}>
                            <CardContent sx={{ padding: '20px', }}>
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
                            
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            </Box>
    );
};

export default ViewBooks;
