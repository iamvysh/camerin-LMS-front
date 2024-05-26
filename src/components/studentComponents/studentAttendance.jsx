import React, { useEffect, useState } from 'react';
import axios from "../../../utils/axiosInstance";
import { Box, Typography,  TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';





export default function StudentAttendance() {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [data,setData]=useState([])


  const id=localStorage.getItem("studentId")
 console.log("studentId",id);
  const Data={
    fromDate:fromDate,
    toDate:toDate
  }
  console.log(Data,"data");
   
  const getAttentenceodStudent=async()=>{
    try {
      const response=await axios.get(`/getattetenceforstudent/${id}`,{ params: { fromDate, toDate }
    })
      console.log(response.data);
      setData(response.data.data)
    } catch (error) {
      console.log(error);
      
    }

  }

  useEffect(()=>{
    getAttentenceodStudent()
  },[fromDate,toDate])
 
  // console.log(fromDate,toDate);

  console.log(data);

  return (
    <Box>
      <Typography variant="h4" textAlign={'center'} gutterBottom>
       Attendance Details
         </Typography>

         <TextField
            required
            id="Date"
            name="Date"
            label="Select attentence From Date"
            type="date"
            variant="outlined"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            fullWidth
            
            InputLabelProps={{
               shrink: true,
            }}
         />

<TextField
            required
            id="Date"
            name="Date"
            label="Select attentence To Date"
            type="date"
            variant="outlined"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            fullWidth
            sx={{marginTop:"15px"}}
            InputLabelProps={{
               shrink: true,
            }}
         />
         <TableContainer style={{marginTop:"10px"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Attendance status</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((item) => (
                            <TableRow key={item?._id}>
                                
                                <TableCell>{item?.Date?.slice(0, 10)}</TableCell>
                                <TableCell >{item?.status}</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>







    </Box>
  )
}
