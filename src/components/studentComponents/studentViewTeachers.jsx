import React, { useState,useEffect } from 'react';
import axios from "../../../utils/axiosInstance"
import { Typography, Paper, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';

const Teachers = () => {

    const [teachers,setTeachers] = useState([{name:"",email:"",mobileNumber:""}])

    console.log('first',teachers)


    
  const handleWhatsAppAction = (contactNumber) => {
    const message = "Hello, is this a good time to talk?"; 
    const whatsappUrl = `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };


    useEffect(() => {
        const fetchData = async () => {
          try {

            const studentId  = localStorage.getItem("studentId")
            const response = await axios.get(`/getteachers/${studentId}`); 
            setTeachers(response.data.data);
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
               <ListItem sx={{ display: 'flex', justifyContent: 'space-between',width:'100vh' }}>
                 
                
                  <Typography variant="h6" component="span" color="text.primary">
                          name
                        </Typography>
                
                        <Typography variant="h6" component="span" color="text.primary">
                          
                          email
                        </Typography>
                        <Typography variant="h6" component="span" color="text.primary" sx={{ ml: 2 }}>
                          
                         contact
                        </Typography>  
                        <Typography variant="h6" component="span" color="text.primary" sx={{ ml: 2 }}>
                          
                          message
                        </Typography>      
                </ListItem>
            </List>
     
      <List>
              {teachers?.map((teachers, index) => (
                <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between',width:'100vh' }}>
                 
                
                  <Typography variant="body1"  color="text.primary">
                          {teachers?.userFullName}
                        </Typography>
                
                        <Typography variant="body2"  color="text.primary">
                          
                          {teachers?.email}
                        </Typography>
                        <Typography variant="body2"  color="text.primary" sx={{ ml: 2 }}>
                          
                          {teachers?.mobileNumber}
                        </Typography>
                     
                 <Button onClick={() => handleWhatsAppAction(teachers?.mobileNumber)}> contact</Button>
       
                </ListItem>
              ))}
            </List>
      </Grid>
    </Grid>
  </div>
  );
};

export default Teachers;
