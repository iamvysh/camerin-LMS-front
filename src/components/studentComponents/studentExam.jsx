import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { saveAs } from 'file-saver'
import toast, { Toaster } from "react-hot-toast";

export default function StudentExam() {
    const [exams, setexams] = useState([]);


    console.log('first,', exams)

    useEffect(() => {
        fetchexams();
    }, []);

    const fetchexams = async () => {
        try {

            const studentId = localStorage.getItem("studentId")
            const response = await axios.get(`/getexam/${studentId}`)
            setexams(response.data.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const handleDownload = async (imageUrl) => {
        try {
            saveAs(imageUrl, 'image.jpg')

            toast.success("Exam  downloaded Successfully", {
                duration: 5000,
                style: {
                    borderRadius: "10px",
                    color: "#000",
                },
            });
        }
        catch (error) {
            toast.error(error.response.data.message, {
                duration: 3000,
                style: {
                    borderRadius: "10px",
                    background: "#e24242",
                    color: "#fff",
                },

            });
        }


    }


    return (
        <>
        <Grid container spacing={3}>
            {exams?.map((exams) => (
                <Grid item key={exams?._id} xs={12} sm={6} md={6} lg={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" align="right" color="textSecondary">
                                Date:{exams?.date}
                            </Typography>
                            <Typography variant="subtitle2" align="right" color="textSecondary">
                                Time:{exams?.time}
                            </Typography>
                            <Typography align="center" gutterBottom>
                                {exams?.title}
                            </Typography>
                            <img src={exams?.imageFile[0]?.url} alt={exams?.title} style={{ maxWidth: '100%', maxHeight: '200px', margin: '0 auto' }} />
                        </CardContent>
                        <CardActions>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => handleDownload(exams?.imageFile[0]?.url)} >Download</Button>
                            </CardActions>




                        </CardActions>

                    </Card>
                </Grid>
            ))}
          
        </Grid>
            <Toaster />
           </>
    );
}
