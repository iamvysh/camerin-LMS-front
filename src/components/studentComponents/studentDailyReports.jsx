import React, { useState,useEffect } from 'react';
import axios from "../../../utils/axiosInstance"
import { Container, Typography, TextField, Button, Box,List,ListItem,Card,CardContent, } from '@mui/material';

const studentDailyReports = () => {
    
  const [fetchDatas,setFetchDatas] = useState([])

 

  const fetchData = async() => {


    const studentId = localStorage.getItem("studentId")

    const response = await axios.get(`/getdailyreporttostudent/${studentId}`)

    setFetchDatas(response.data.data)

  }

  useEffect(() => {
    fetchData()
  },[])



  return (
    <>
    <Box>
    <Box sx={{ marginY: "20px", marginX: "40px", }}>
      <List>
        {fetchDatas?.map((report) => (
          <ListItem key={report.id}>
            <Card sx={{width:"500px",minHeight:'150px'}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {report?.Date}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ wordWrap:'break-word'}}>
                  {report?.description}
                </Typography> 
               
              </CardContent>
              <CardContent>
           
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>
  </>
  );
};

export default studentDailyReports;

