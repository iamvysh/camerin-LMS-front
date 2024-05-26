import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from '../../../utils/axiosInstance';
import Attendance from './Attendance';

export default function AttendenceRegister() {
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [editing, setEditing] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState('');

    console.log("up",updatedStatus)

    const fetchData = async () => {
        try {
            const response = await axios.post(`/getattentence`, { Date: date });
            setData(response.data.data);
        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    const handleEdit = (studentId, currentStatus) => {
        setEditing(studentId);
        setUpdatedStatus(currentStatus === 'present' ? 'absent' : 'present');
    };

    const handleSave = async (studentId) => {
        try {
            const response = await axios.put(`/updateattentence`, { Date: date , attentence:updatedStatus});
           
            setEditing(null);
        } catch (error) {
            console.error("Error updating attendance", error);
        }
    };

    return (
        <div>
            <TextField
                required
                id="Date"
                name="Date"
                label="Date"
                type="date"
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button onClick={fetchData}>Get Attendance</Button>
            <Box marginTop={3}>
                {data?.map(student => (
                    <Grid container key={student?._id} spacing={2} alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="subtitle1">{student?.studentId?.userFullName}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            {editing === student._id ? (
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        value={updatedStatus}
                                        onChange={(e) => setUpdatedStatus(e.target.value)}
                                    >
                                        <FormControlLabel value="present" control={<Radio />} label="Present" />
                                        <FormControlLabel value="absent" control={<Radio />} label="Absent" />
                                    </RadioGroup>
                                </FormControl>
                            ) : (
                                <Typography variant="body1" style={{ color: student?.status === 'present' ? 'green' : 'red' }}>
                                    {student?.status}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            {editing === student._id ? (
                                <Button variant="contained" color="primary" onClick={() => handleSave(student._id)}>Save</Button>
                            ) : (
                                <Button variant="outlined" color="secondary" onClick={() => handleEdit(student._id, student?.status)}>Edit</Button>
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </div>
    );
}
