import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box, ListItem, List, Card, CardContent } from '@mui/material';
import axios from "../../../utils/axiosInstance";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";   

const Seminar = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [seminarList, setSeminarList] = useState([]);
    const [selectedSeminar, setSelectedSeminar] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedDeadline, setUpdatedDeadline] = useState('');


    const nav = useNavigate()

    useEffect(() => {
        fetchSeminars();
    }, []);

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

    const handleSubmit = async () => {
        try {
            const teacherId = localStorage.getItem("teacherId");
            const response = await axios.post(`/addseminar/${teacherId}`, {
                title,
                description,
                deadLine
            });
            console.log('Seminar created:', response.data);
            setTitle('');
            setDescription('');
            setDeadline('');
            fetchSeminars();
            toast.success("Seminar added Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
        } catch (error) {
            console.error('Error creating seminar:', error);
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

    const fetchSeminars = async () => {
        const teacherId = localStorage.getItem("teacherId");
        const response = await axios.get(`/seminar/teacher/getteacher/${teacherId}`);
        setSeminarList(response?.data?.data);
    };

    const handleEdit = (seminar) => {
        setSelectedSeminar(seminar);
        setUpdatedTitle(seminar.title);
        setUpdatedDescription(seminar.description);
        setUpdatedDeadline(seminar.deadline);
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

    const handleUpdate = async () => {
        try {
            const updatedData = {
                title: updatedTitle,
                description: updatedDescription,
                deadline: updatedDeadline
            };
            await axios.put(`/seminar/${selectedSeminar._id}`, updatedData);
            console.log('Seminar updated successfully');
            setSelectedSeminar(null);
            setUpdatedTitle('');
            setUpdatedDescription('');
            setUpdatedDeadline('');
            fetchSeminars();
            toast.success("Seminar Updated Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
        } catch (error) {
            console.error('Error updating seminar:', error);
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
        <Box sx={{ display: 'flex' }}>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Typography variant="h4" gutterBottom>
                    Create seminar
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
                        label="Enter seminar here"
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
                    Send seminar
                </Button>
            </Box>
            <Box sx={{ marginY: "20%", marginX: "40px" }}>
                <List>
                    {seminarList?.map((seminar) => (
                        <ListItem key={seminar?.id}>
                            <Card sx={{ width: "300px", minHeight: '150px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {seminar?.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                        {seminar?.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Deadline: {seminar?.deadLine}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Button onClick={() => handleEdit(seminar)}>Edit</Button>
                                </CardContent>
                                <CardContent>
                                    <Button onClick={() =>nav(`/seminar/${seminar?._id}`)}>View</Button>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Box>
            {selectedSeminar && (
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
                   
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Update Seminar
                    </Button>
                </Box>
            )}
            <Toaster />
        </Box>
    );
};

export default Seminar;
