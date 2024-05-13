import React, { useState } from 'react';
import axios from '../../../utils/axiosInstance';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";   
const AddBooks = () => {
    const [title, settitle] = useState('');
    const [availiableCopies, setavailiableCopies] = useState('');
    const [category, setCategory] = useState('');

    const handletitleChange = (event) => {
        settitle(event.target.value);
    };

    const handleavailiableCopiesChange = (event) => {
        setavailiableCopies(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const bookData = {
                title,
                availiableCopies,
                category
            };
  
            const response = await axios.post('/addbook', bookData);
            console.log('Book created:', response.data);
            toast.success("Book Addede Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
        
            settitle('');
            setavailiableCopies('');
            setCategory('');
        } catch (error) {
            console.error('Error creating book:', error);
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
        <Box>
            <Typography variant="h4" gutterBottom>
                Create Book
            </Typography>
            <Box sx={{ maxWidth: 400 }}>
                <TextField
                    id="title"
                    label="Book Name"
                    variant="outlined"
                    value={title}
                    onChange={handletitleChange}
                    fullWidth
                    margin="normal"
                    required={true}
                />
                <TextField
                    id="availiableCopies"
                    label="Available Copies"
                    variant="outlined"
                    type="number"
                    value={availiableCopies}
                    onChange={handleavailiableCopiesChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        required
                        labelId="category-label"
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="Fiction">Fiction</MenuItem>
                        <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                        <MenuItem value="Science Fiction">Science Fiction</MenuItem>
                        {/* Add more categories as needed */}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Create Book
                </Button>
            </Box>
            
      <Toaster />
        </Box>
    );
};

export default AddBooks;
