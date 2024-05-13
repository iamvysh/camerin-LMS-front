import React, { useState, useEffect } from 'react';
import axios from "../../../utils/axiosInstance"
import { Typography, Paper, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const MarkCard = () => {
  const [students, setStudents] = useState([]);

  const nav = useNavigate()
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherId = localStorage.getItem("teacherId")
        const response = await axios.get(`/teacher/getstudentsunderdepartment/${teacherId}`); 
        setStudents(response?.data?.Data);
      } catch (error) {
        console.error('Error fetching teacher profile data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', width: '100vh' }}>
              <Typography variant="h6" component="span" color="text.primary">
                Name
              </Typography>
              <Typography variant="h6" component="span" color="text.primary">
                Email
              </Typography>
              <Typography variant="h6" component="span" color="text.primary" sx={{ ml: 2 }}>
                Add mark
              </Typography>  
              
            </ListItem>
          </List>
          <List>
            {students?.map((student, index) => (
              <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100vh' }}>
                <Typography variant="body2" color="text.primary">
                  {student?.userFullName}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {student?.email}
                </Typography>
                
                <Button onClick={() => nav(`/addmark/${student?._id}`) }>add mark</Button>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default MarkCard;
