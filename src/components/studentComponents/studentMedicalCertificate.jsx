import React, { useState,useEffect } from 'react';
import { TextField, Button, Typography, Box,CircularProgress,Grid,Card,CardContent,CardActions } from '@mui/material';
import axios from '../../../utils/axiosInstance';
import toast, { Toaster } from "react-hot-toast";


const StudentMedicalCertificate = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState(null);
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState({
    title: false,
    date: false,
    images: false
  });
   const [certificates,setCertificates] = useState([])

   console.log('cer',certificates)

  const handleImageChange = (event) => {
    setImages(event.target.files[0]);
  };

  const fetchCertificates = async() => {
try{
    const studentId = localStorage.getItem("studentId")

    const response = await axios.get(`/medicalcertificatetostudent/${studentId}`)

    setCertificates(response.data.data)
}catch(err){
    console.error("error fetching",err)
}
   
  }

  const handleSubmit = async () => {
    try {

      
      if (!title || !date || !images) {
        setError({
          title: !title,
          date: !date,
          images: !images
        });
        return;
      }
      setLoading(true)

      const formData = new FormData();
      formData.append('title', title);
      formData.append('Date', date);
      formData.append('images', images);

      const studentId = localStorage.getItem("studentId");

      const response = await axios.post(`/addmedicalcertificate/${studentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false)
      toast.success("Request  created Successfully", {
        duration: 5000,
        style: {
            borderRadius: "10px",
            color: "#000",
        },
    });

      console.log('Certificate uploaded successfully:', response.data);
    } catch (error) {
        setLoading(false)
      console.error('Error uploading certificate:', error);
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
  useEffect(() => {
    fetchCertificates()
  },[])

  return (
    <>
    <Box sx={{paddingBottom:'40px'}}>
      <Typography variant="h4" gutterBottom>
        Upload Medical Certificate
      </Typography>
      <Box>
        <TextField
          required
          label="Reason"
          variant="outlined"
          value={title}
          error={error.title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          id="Date"
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
            Upload
          </Button>
        )}
       
      </Box>
      <Toaster />
    </Box>
    <Grid container spacing={3}>
            {certificates?.map((certificate) => (
                <Grid item key={certificate?._id} xs={12} sm={6} md={6} lg={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" align="right" color="textSecondary">
                                {certificate?.Date.slice(0, 10)}
                            </Typography>
                            <Typography align="center" gutterBottom>
                                {certificate?.title}
                            </Typography>
                            <img src={certificate?.imagefile[0]?.url} alt={certificate?.title} style={{ maxWidth: '100%', maxHeight: '200px', margin: '0 auto' }} />
                        </CardContent>
                        <CardActions>
                            {certificate.isApproved ? (
                                <Button variant="contained" color="primary" >Approved</Button>
                            ) : (
                                <Button variant="contained" color="primary" >pending</Button>
                            )}

                        </CardActions>

                    </Card>
                </Grid>
            ))}
        </Grid>
    </>
  );
};

export default StudentMedicalCertificate;
