import React, { useState, useEffect } from 'react';
import axios from "../../../utils/axiosInstance";
import { Box, Typography, TextField, Button, List, ListItem, Card, CardContent } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
const Dailydescription = () => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [fetchDatas, setFetchDatas] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [updatedDate, setUpdatedDate] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Date') {
            setDate(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Date') {
            setUpdatedDate(value);
        } else if (name === 'description') {
            setUpdatedDescription(value);
        }
    };

    const handleSubmit = async () => {
        try {
            const teacherId = localStorage.getItem("teacherId");
            const response = await axios.post(`/adddailyreport/${teacherId}`, { Date: date, description });
            console.log('Daily description added successfully');
            setDate('');
            setDescription('');
            fetchData();
            toast.success("Daily report addeed Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
        } catch (error) {
            console.error('Error adding daily description:', error);
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
                Date: updatedDate,
                description: updatedDescription
            };
            await axios.put(`/updatedailyreport/${selectedReport._id}`, updatedData);
            console.log('Daily report updated successfully');
            setSelectedReport(null);
            setUpdatedDate('');
            setUpdatedDescription('');
            fetchData();
            toast.success("DailyReport updated successfully ", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });
        } catch (error) {
            console.error('Error updating daily report:', error);
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
        const response = await axios.get(`/getdailyreporttoteacher/${teacherId}`);
        setFetchDatas(response.data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (report) => {
        setSelectedReport(report);
        setUpdatedDate(report.Date);
        setUpdatedDescription(report.description);
    };

    return (
        <Box sx={{ width: "150vh" }}>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Typography variant="h4" gutterBottom>
                    Add Daily description
                </Typography>
                <Box width="100%">
                    <Box mb={2}>
                        <TextField
                        required
                            id="Date"
                            name="Date"
                            label="Date"
                            type="date"
                            variant="outlined"
                            value={date}
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
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Send description
                </Button>
            </Box>
            <Box>
                <Box sx={{ marginY: "20%", marginX: "40px" }}>
                    <List>
                        {fetchDatas?.map((report) => (
                            <ListItem key={report?.id}>
                                <Card sx={{ width: "500px", minHeight: '150px' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {report?.Date}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                            {report?.description}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <Button onClick={() => handleEdit(report)}>Edit</Button>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            {selectedReport && (
                <Box>
                    <TextField
                        id="updatedDate"
                        name="Date"
                        label="Date"
                        type="date"
                        variant="outlined"
                        value={updatedDate}
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
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Box>
            )}
              <Toaster />
        </Box>
    );
};

export default Dailydescription;
