import React, { useState,useEffect } from 'react';
import { Box, Card, CardContent,  Typography, TextField, Button,List,ListItem, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Backdrop, Fade  } from '@mui/material';
import axios from "../../../utils/axiosInstance"
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const Assignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadLine, setDeadline] = useState('');
    const [assignmentList,setAssignmentList] = useState([])
    const [startDate,setStartDate] = useState('')
    const [submittedStudents, setSubmittedStudents] = useState([]);

    
 const nav = useNavigate()


    console.log("aaaaaa",submittedStudents)



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
          setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'deadLine') {
          setDeadline(value);
        }else if (name === "startDate"){
            setStartDate(value)
        }
      };
      console.log('Title:', title);
      console.log('assignment Text:', description);
      console.log('Deadline:', deadLine);
    
      const handleSubmit =async () => {

        try {
            const teacherId = localStorage.getItem("teacherId")
            const response = await axios.post(`/addassignment/${teacherId}`, { 
                title,description,deadLine,startDate
            });
            toast.success("assignment added Successfully", {
              duration: 5000,
              style: {
                borderRadius: "10px",
                color: "#000",
              },
            });

            console.log('assignment created:', response.data.Data);

            setTitle('');
           setDescription("")
            setDeadline('');
            setStartDate('');
            fetchAssignments();
          } catch (error) {

            console.error('Error creating assignment:', error);
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

      const fetchAssignments = async() => {
        try{

            const teacherId = localStorage.getItem("teacherId")

            const response = await axios.get(`/assignments/teacher/getteacher/${teacherId}`)
            setAssignmentList(response.data.Data)


        }
        catch(error){
            console.error('Error fetching assignment:', error);
        }

      }
      

    

      // get submitted students 

      const fetchSubmittedStudents = async (id) => {
        try {

            nav(`/assignment/${id}`)

        } catch (error) {
            console.error('Error fetching submitted students:', error);
        }
    };


    useEffect(() => {
        fetchAssignments();
      
      },[])



  return (
    <>
    <Box sx={{display:'flex'}}>
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Create Assignment
      </Typography>
      <Box width="100%">
        <Box mb={2}>
          <TextField
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
            id="startDate"
            name="startDate"
            label="startDate"
            type="date"
            variant="outlined"
            value={startDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <br />
        <Box mb={2}>
          <TextField
            id="deadLine"
            name="deadLine"
            label="Deadline"
            type="date"
            variant="outlined"
            value={deadLine}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <br />
        <TextField
          id="homework"
          name="description"
          label="Enter assignment here"
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
        Send assignment
      </Button>
    </Box>
    <Box sx={{ marginY: "20%", marginX: "40px", }}>
      <List>
        {assignmentList?.map((assignment) => (
          <ListItem key={assignment.id}>
            <Card sx={{width:"300px",minHeight:'150px'}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {assignment?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ wordWrap:'break-word'}}>
                  {assignment?.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Date: {assignment?.startDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Deadline: {assignment?.deadLine}
                </Typography>
              </CardContent>
              <CardContent>
              <Button onClick={() => fetchSubmittedStudents(assignment?._id)}>View Submitted students</Button>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
    <Toaster />
  </Box>
 </>
  );
};

export default Assignment;