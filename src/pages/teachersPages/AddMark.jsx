import React, { useState,useEffect } from 'react';
import { Table, TableBody,styled,Box, TableCell,Typography, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import axios from "../../../utils/axiosInstance"
import { useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const MainContainer = styled(Box)(({ theme }) => ({
   
}));

const MainTitle = styled(Box)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));

const SubContainer = styled(Box)(({ theme }) => ({
  
}));


function AddMarkCard() {
  const [rows, setRows] = useState([{ subject: '', totalmark: '', grade: '' }]);
  const [title, setTitle] = useState("");
  const [data,setData] = useState([])


  console.log('first',data)

  const {id} = useParams();

  const handleAddRow = () => {
    const newRow = { subject: '', totalmark: '', grade: '' };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const handleCreateTable = async () => {
    try {
      const data = { title: title, row: rows };
      console.log('data',data)

      const teacherId = localStorage.getItem("teacherId")
      const response = await axios.post(`/addmarksheet/${teacherId}/${id}`, data);
      console.log('Table created successfully:', response.data);
      fetchData();
      toast.success("Marks added Successfully", {
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

  const fetchData = async () => {
    try {
        const teacherId = localStorage.getItem("teacherId");
        const response = await axios.get(`/getmarksheet/${teacherId}`);
        setData(response?.data?.data);
    } catch (error) {
        console.error("Error getting Time Tables:", error);
    }
};

useEffect(() => {
    fetchData();
}, []);

  return (
    <>
    <div style={{margin:'10%'}}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TableContainer component={Paper}>
        <h2>Mark Sheet</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Total Mark</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={row?.subject}
                    onChange={(e) => handleChange(index, 'subject', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                  required
                    type='number'
                    value={row?.totalmark}
                    onChange={(e) => handleChange(index, 'totalmark', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                  required
                    value={row?.grade}
                    onChange={(e) => handleChange(index, 'grade', e.target.value)}
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
        Create Mark Sheet
      </Button>
    </div>
    <MainContainer>
           
            <SubContainer>
                {data?.map((timetable, index) => (
                    <div key={index}>
                        <Typography variant="h6" gutterBottom>
                          
                           <br />
                           <br />
                           <br />
                           {timetable?.title}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label={`simple table ${index}`}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Total Mark</TableCell>
                                        <TableCell>Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {timetable?.marksheet?.map((entry, subIndex) => (
                                        <TableRow key={`${index}-${subIndex}`}>
                                            <TableCell>{entry?.subject}</TableCell>
                                            <TableCell>{entry?.totalmark}</TableCell>
                                            <TableCell>{entry?.grade}</TableCell>
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

export default AddMarkCard;
