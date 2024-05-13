import React, { useEffect, useState } from 'react';
import axios from "../../../utils/axiosInstance";
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Grid, TextField, Button } from '@mui/material';

const Attendance = () => {
   const [students, setStudents] = useState([]);
   const [date, setDate] = useState('');
   const [attentence, setAttentence] = useState([]);

   console.log(attentence)

   const id = localStorage.getItem("teacherId");

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`/teacher/getstudentsunderdepartment/${id}`); 
            const initialAttentence = response.data.Data.map(student => ({ studentId: student._id, status: 'present' }));
            setStudents(response.data.Data);
            setAttentence(initialAttentence);
         } catch (error) {
            console.error('Error fetching teacher profile data:', error);
         }
      };

      fetchData();
   }, [id]);

   const handleAttendanceChange = (studentId, status) => {
      const studentIndex = attentence.findIndex(item => item.studentId === studentId);
      if (studentIndex !== -1) {
         const updatedAttendance = [...attentence];
         updatedAttendance[studentIndex] = { studentId, status };
         setAttentence(updatedAttendance);
      } else {
         setAttentence(prevAttendance => [...prevAttendance, { studentId, status }]);
      }
   };

   const handleSubmit = async () => {
      try {
         const response = await axios.post(`/addattentence/${id}`, { attentence, Date: date });
         console.log(response.data);
         console.log("date",date);
      } catch (error) {
         console.error('Error submitting attendance:', error);
      }
   };

   return (
      <Box>
         <Typography variant="h4" textAlign={'center'} gutterBottom>
            Add Attendance
         </Typography>
         <TextField
            required
            id="Date"
            name="Date"
            label="Date"
            type="date"
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            InputLabelProps={{
               shrink: true,
            }}
         />
         <Box marginTop={3}>
            {students.map(student => (
               <Grid container key={student._id} spacing={2} alignItems="center">
                  <Grid item xs={6} marginBottom={2}>
                     <Typography variant="subtitle1">{student.userFullName}</Typography>
                  </Grid>
                  <Grid item xs={6} marginBottom={2}>
                     <FormControl component="fieldset">
                        <RadioGroup
                           row
                           aria-label="attendance"
                           name={`attendance-${student._id}`}
                           value={attentence.find(item => item.studentId === student._id)?.status || 'present'}
                           onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
                        >
                           <FormControlLabel value="present" control={<Radio />} label="Present" />
                           <FormControlLabel value="absent" control={<Radio />} label="Absent" />
                        </RadioGroup>
                     </FormControl>
                  </Grid>
               </Grid>
            ))}
         </Box>
         <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Attendance</Button>
      </Box>
   );
};

export default Attendance;
