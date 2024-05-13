import React, { useState,useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer,styled,Box, TableHead, TableRow, Paper, Button, TextField,Typography } from '@mui/material';
import axios from "../../../utils/axiosInstance"
import toast, { Toaster } from "react-hot-toast";



const MainContainer = styled(Box)(({ theme }) => ({
   
}));

const MainTitle = styled(Box)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));

const SubContainer = styled(Box)(({ theme }) => ({
  
}));



function ExamTimeTable() {
  const [rows, setRows] = useState([{ subject: '', date: '', timeslot: '' }]);
  const [timetables, setTimetables] = useState([]);

  console.log('rows',rows)

  const handleAddRow = () => {
    const newRow = { subject: '', date: '', timeslot: '' };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const fetchTimetables = async () => {
    try {
        const teacherId = localStorage.getItem("teacherId");
        const response = await axios.get(`/gettimetabletoteacher/${teacherId}`);
        setTimetables(response?.data?.data);
    } catch (error) {
        console.error("Error getting Time Tables:", error);
    }
};

useEffect(() => {
    fetchTimetables();
}, []);

  const handleCreateTable = async () => {
    try {

        const teacherId = localStorage.getItem("teacherId")
        const response =  await axios.post(`/addtimetable/${teacherId}`, rows);
         console.log('Table created successfully:', response.data)
         fetchTimetables();
         toast.success("Timetable Created Successfully", {
          duration: 5000,
          style: {
            borderRadius: "10px",
            color: "#000",
          },
        });
       } catch (error) {
         console.error('Error adding daily report:', error);
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
    <>
    <div>
      <TableContainer component={Paper}>
        <h2> Exam Time Table</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={row?._id}>
                <TableCell>
                  <TextField
                  required
                    value={row?.subject}
                    onChange={(e) => handleChange(index, 'subject', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                  type='date'
                  required
                    value={row?.date}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                  required
                    value={row?.timeslot}
                    onChange={(e) => handleChange(index, 'timeslot', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button variant="contained" color="primary" onClick={handleAddRow}>
        Add Row
      </Button>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleCreateTable}>
       Create Time Table
      </Button>
    </div>

    <MainContainer>
            <MainTitle>Time Tables</MainTitle>
            <SubContainer>
                {timetables?.map((timetable, index) => (
                    <div key={index}>
                        <Typography variant="h6" gutterBottom>
                           <br />
                           <br />
                           <br />
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label={`simple table ${index}`}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time Slot</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {timetable?.timetable?.map((entry, subIndex) => (
                                        <TableRow key={`${index}-${subIndex}`}>
                                            <TableCell>{entry?.subject}</TableCell>
                                            <TableCell>{entry?.date}</TableCell>
                                            <TableCell>{entry?.timeslot}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))}
            </SubContainer>
            
      <Toaster />
        </MainContainer>
    </>
  );
}

export default ExamTimeTable; 