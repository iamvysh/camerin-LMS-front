import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axiosInstance';
import { Box, Typography, TextField, Button, List, ListItem, Card, CardContent } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";   
const Notice = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [fetchDatas, setFetchDatas] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedDeadline, setUpdatedDeadline] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'deadline') {
            setDeadline(value);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setUpdatedTitle(value);
        } else if (name === 'description') {
            setUpdatedDescription(value);
        } else if (name === 'deadline') {
            setUpdatedDeadline(value);
        }
    };

    const handleCreateNotice = async () => {
        try {
            const teacherId = localStorage.getItem("teacherId");
            await axios.post(`/addnotice/${teacherId}`, { title, description, deadline });
            console.log('Notice created successfully');
            setTitle('');
            setDescription('');
            setDeadline('');
            fetchData();
            toast.success("Notice added  Successfulyl", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
        } catch (error) {
            console.error('Error creating notice:', error);
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

    const handleUpdateNotice = async () => {
        try {
            const updatedData = {
                title: updatedTitle,
                description: updatedDescription,
                deadline: updatedDeadline
            };
            await axios.put(`/updatenotice/${selectedNotice?._id}`, updatedData);
            console.log('Notice updated successfully');
            fetchData();
            toast.success("Notice updated Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
            setSelectedNotice(null);
            setUpdatedTitle('');
            setUpdatedDescription('');
            setUpdatedDeadline('');
        } catch (error) {
            console.error('Error updating notice:', error);
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

    const fetchData = async () => {
        const teacherId = localStorage.getItem("teacherId");
        const response = await axios.get(`/getnoticetoteacher/${teacherId}`);
        setFetchDatas(response?.data?.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (notice) => {
        setSelectedNotice(notice);
        setUpdatedTitle(notice.title);
        setUpdatedDescription(notice.description);
        setUpdatedDeadline(notice.expireAt);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifydescription: 'center', minHeight: '100vh' }}>
                <Typography variant="h4" gutterBottom>
                    Create Notice
                </Typography>
                <Box width="100%">
                    <Box mb={2}>
                        <TextField
                        required
                            id="title"
                            name="title"
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                    <br />
                    <Box mb={2}>
                        <TextField
                        required
                            id="deadline"
                            name="deadline"
                            label="Deadline"
                            type="date"
                            variant="outlined"
                            value={deadline}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                    <TextField
                    required
                        id="description"
                        name="description"
                        label="Description"
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
                <Button variant="contained" color="primary" onClick={handleCreateNotice}>
                    Send Notice
                </Button>
            </Box>
            <Box sx={{ marginY: "20%", marginX: "40px" }}>
                <List>
                    {fetchDatas?.map((notice) => (
                        <ListItem key={notice?.id}>
                            <Card sx={{ width: "300px", minHeight: '150px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {notice?.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                        {notice?.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Deadline: {notice?.expireAt}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Button onClick={() => handleEdit(notice)}>Edit</Button>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
                {selectedNotice && (
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
                        <br />
                        <TextField
                            id="updatedDeadline"
                            name="deadline"
                            label="Deadline"
                            type="date"
                            variant="outlined"
                            value={updatedDeadline}
                            onChange={handleUpdateChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                        <Button variant="contained" color="primary" onClick={handleUpdateNotice}>
                            Update
                        </Button>
                    </Box>
                )}
            </Box>
            <Toaster />
        </Box>
    );
};

export default Notice;
