import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { saveAs } from 'file-saver'

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
            setexams(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const handleDownload = async (imageUrl) => {
         saveAs(imageUrl, 'image.jpg')
    }

    const handleApproval = async (certificateId) => {
        try {
            const response = await axios.put(`/approveamedicalcerificate/${certificateId}`)
            fetchexams();
            console.log(response.data)
        }
        catch (error) {
            console.error("error approving ,", err)
        }
    };

    return (
        <Grid container spacing={3}>
            {/* {exams?.map((exams) => (
                <Grid item key={exams?._id} xs={12} sm={6} md={6} lg={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" align="right" color="textSecondary">
                                {exams?.Date.slice(0, 10)}
                            </Typography>
                            <Typography align="center" gutterBottom>
                                {exams?.title}
                            </Typography>
                            <img src={exams?.imagefile[0]?.url} alt={exams?.title} style={{ maxWidth: '100%', maxHeight: '200px', margin: '0 auto' }} />
                        </CardContent>
                        <CardActions>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => handleDownload(exams?.imagefile[0]?.url)} >Download</Button>
                            </CardActions>
                            {exams.isApproved ? (
                                <Button variant="contained" color="primary" >Approved</Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={() => handleApproval(exams?._id)}>Approve</Button>
                            )}

                        </CardActions>

                    </Card>
                </Grid>
            ))} */}
        </Grid>
    );
}
