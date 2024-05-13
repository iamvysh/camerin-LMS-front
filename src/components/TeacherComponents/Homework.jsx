import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, Card, CardContent } from '@mui/material';
import axios from "../../../utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const Homework = () => {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [homeworks, setHomeworks] = useState([]);
    const [selectedHomework, setSelectedHomework] = useState(null);
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedTitle, setUpdatedTitle] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const teacherId = localStorage.getItem("teacherId")
            const response = await axios.get(`/gethomeworktoteacher/${teacherId}`);
            setHomeworks(response?.data?.data);
        } catch (error) {
            console.error('Error fetching homeworks:', error);
        }
    };

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleEdit = (homework) => {
        setSelectedHomework(homework);
        setUpdatedTitle(homework.title);
        setUpdatedDescription(homework.description);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setUpdatedTitle(value);
        } else if (name === 'description') {
            setUpdatedDescription(value);
        }
    };

    const handleSubmit = async () => {
        try {
            const teacherId = localStorage.getItem("teacherId")
            const response = await axios.post(`/addhomework/${teacherId}`, { description, title });
            console.log('Homework created:', response?.data);
            setDescription('');
            setTitle('');
            fetchData();
            toast.success("Homework added  Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
        } catch (error) {
            console.error('Error creating homework:', error);
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

    const handleUpdate = async () => {
        try {
            const updatedData = {
                description: updatedDescription,
                title: updatedTitle
            };
            await axios.put(`/updatehomework/${selectedHomework._id}`, updatedData);
            console.log('Homework updated successfully');
            setSelectedHomework(null);
            setUpdatedDescription('');
            setUpdatedTitle('');
            fetchData();
            toast.success("HomeWork Updated Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
        } catch (error) {
            console.error('Error updating homework:', error);
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
        <Box sx={{ display: "flex" }}>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Typography variant="h4" gutterBottom>
                    Create Homework
                </Typography>
                <Box width="100%">
                    <Box mb={2}>
                        <TextField
                        required
                            id="title"
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <TextField
                    required
                        id="homework"
                        label="Enter homework here"
                        multiline
                        rows={6}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={description}
                        onChange={handleChange}
                    />
                </Box>
                <br />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Send Homework
                </Button>
            </Box>
            <Box sx={{ marginY: "20%", marginX: "40px" }}>
                <List>
                    {homeworks?.map((homework) => (
                        <ListItem key={homework?.id}>
                            <Card sx={{ width: "300px", minHeight: '150px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {homework?.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                        {homework?.description}
                                    </Typography>
                                    <br />
                                    <br />
                                    <Typography variant="body2" color="text.secondary">
                                        Deadline: {homework?.expireAt}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Button onClick={() => handleEdit(homework)}>Edit</Button>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Box>
            {selectedHomework && (
                <Box>
                    <TextField
                        id="updatedTitle"
                        name="title"
                        label="Title"
                        variant="outlined"
                        value={updatedTitle}
                        onChange={handleUpdateChange}
                        fullWidth
                    />
                    <TextField
                        id="updatedDescription"
                        name="description"
                        label="Description"
                        multiline
                        rows={6}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={updatedDescription}
                        onChange={handleUpdateChange}
                    />
                    <br />
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Box>
            )}
             <Toaster />
        </Box>
    );
};

export default Homework;
