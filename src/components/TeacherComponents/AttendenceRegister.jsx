import React from 'react'
import { useState,useEffect } from 'react'
import { TextField,Button,Box,Grid,Typography,FormControl,RadioGroup,FormControlLabel,Radio } from '@mui/material'
import axios from '../../../utils/axiosInstance'

export default function AttendenceRegister() {

    const [data,setData] = useState([])
    const [Date,setDate] = useState('')

    console.log('data',data)
    console.log('Date',Date)


    const fetchData = async () => {
        try{
        const response = await axios.post(`/getattentence`,{ Date})

        setData(response.data.data)
        }
        catch(error){
            console.error("error fetching data",error)
        }
    }
  return (
    <div>
       <TextField
            required
            id="Date"
            name="Date"
            label="Date"
            type="date"
            variant="outlined"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            InputLabelProps={{
               shrink: true,
            }}
         />
         <Button onClick={ fetchData} >get attendance</Button>
         <Box marginTop={3}>
            {data?.map(student => (
               <Grid container key={student?._id} spacing={2} alignItems="center">
                  <Grid item xs={6} marginBottom={2}>
                     <Typography variant="subtitle1">{student?.studentId?.userFullName}</Typography>
                  </Grid>
                  <Grid item xs={6} marginBottom={2}>
                  <Typography variant="body1" style={{ color: student?.status === 'present' ? 'green' : 'red' }}>
                           {student?.status}
                        </Typography>
                  </Grid>
               </Grid>
            ))}
         </Box>
    </div>
  )
}
