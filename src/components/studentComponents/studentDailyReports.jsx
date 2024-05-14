import React, { useState,useEffect } from 'react';
import axios from "../../../utils/axiosInstance"
import { Container, Typography, Grid, Box,List,ListItem,Card,CardContent, } from '@mui/material';

const studentDailyReports = () => {
    
  const [fetchDatas,setFetchDatas] = useState([])

  const backgroundColors = ['#f0f0f0', '#e0e0e0', '#d0d0d0', '#c0c0c0'];

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
        <Box sx={{ marginY: "20px", marginX: "40px" }}>
            <List>
                <Grid container spacing={2}>
                    {fetchDatas?.map((report,index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={report._id}>
                            <Card sx={{ minWidth: "200px", minHeight: '150px',backgroundColor: backgroundColors[index % backgroundColors.length] }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {report?.Date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                        {report?.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </List>
        </Box>
    </Box>
</>

  );
};

export default studentDailyReports;

