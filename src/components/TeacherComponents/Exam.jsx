import React, { useState } from 'react';
import { TextField, Button, Typography, Box,CircularProgress } from '@mui/material';
import axios from '../../../utils/axiosInstance';
import toast, { Toaster } from "react-hot-toast";

const Exam = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [images, setImages] = useState(null);
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState({
    title: false,
    date: false,
    images: false
  });

  const handleImageChange = (event) => {
    setImages(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {

      if (!title || !date || !images || !time) {
        setError({
          title: !title,
          date: !date,
          images: !images,
          time:!time
        });
        return;
      }
      setLoading(true)


      const formData = new FormData();
      formData.append('title', title);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('images', images);

     const teacherId = localStorage.getItem("teacherId")
      const response = await axios.post(`/addexam/${teacherId}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false)
      toast.success("Exam  created Successfully", {
        duration: 5000,
        style: {
            borderRadius: "10px",
            color: "#000",
        },
    });

      console.log('Exam created successfully:', response.data);
    } catch (error) {

      setLoading(false)
      toast.error(error.response.data.message, {
        duration: 3000,
        style: {
            borderRadius: "10px",
            background: "#e24242",
            color: "#fff",
        },
    });
      console.error('Error creating exam:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create Exam
      </Typography>
      <Box>
        <TextField
          label="Exam Name"
          variant="outlined"
          value={title}
          error={error.title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          value={date}
          error={error.date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Time"
          type="time"
          variant="outlined"
          value={time}
          error={error.time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <input
        required
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleImageChange}
          style={{ margin: '10px 0' }}
        />
         {error.images && (
          <Typography variant="caption" color="error">
            Please select an image file.
          </Typography>
        )}

{loading ? (
            <CircularProgress/>
        ) : (
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Exam
        </Button>
          )}
      </Box>
      <Toaster />
    </Box>
  );
};

export default Exam;
