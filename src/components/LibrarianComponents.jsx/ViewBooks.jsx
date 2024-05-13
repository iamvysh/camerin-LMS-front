import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';

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
            {books?.map((book) => (
                <Card key={book.id} sx={{ minWidth: 275, marginBottom: 2 }}>
                    <CardContent sx={{padding:'20px'}}>
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
                        {/* Add actions like edit and delete buttons if needed */}
                        {/* <Button size="small">Edit</Button>
                        <Button size="small">Delete</Button> */}
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default ViewBooks;
