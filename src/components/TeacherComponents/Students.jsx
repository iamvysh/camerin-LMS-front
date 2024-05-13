import React, { useState, useEffect } from 'react';
import axios from "../../../utils/axiosInstance"
import { Typography, Paper, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@mui/material';

const Students = () => {
  const [students, setStudents] = useState([]);

  const handleWhatsAppAction = (contactNumber) => {
    const message = "Hello, is this a good time to talk?"; 
    const whatsappUrl = `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

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
                Contact
              </Typography>  
              <Typography variant="h6" component="span" color="text.primary" sx={{ ml: 2 }}>
                Message
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
                <Typography variant="body2" color="text.primary" sx={{ ml: 2 }}>
                  {student?.mobileNumber}
                </Typography>
                <Button onClick={() => handleWhatsAppAction(student?.mobileNumber)}>Contact</Button>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Students;
