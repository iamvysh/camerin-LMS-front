import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { saveAs } from 'file-saver'

export default function MedicalCertificates() {
    const [certificates, setCertificates] = useState([]);

    console.log('first,', certificates)

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {

            const teacherId = localStorage.getItem("teacherId")
            const response = await axios.get(`getallmedicalCertificate/${teacherId}`)
            setCertificates(response.data.date);
        } catch (error) {
            console.error('Error fetching certificates:', error);
        }
    };

    const handleDownload = async (imageUrl) => {
        await saveAs(imageUrl, 'image.jpg')
    }

    const handleApproval = async (certificateId) => {
        try {
            const response = await axios.put(`/approveamedicalcerificate/${certificateId}`)
            fetchCertificates();
            console.log(response.data)
        }
        catch (error) {
            console.error("error approving ,", err)
        }
    };

    return (
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
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => handleDownload(certificate?.imagefile[0]?.url)} >Download</Button>
                            </CardActions>
                            {certificate.isApproved ? (
                                <Button variant="contained" color="primary" >Approved</Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={() => handleApproval(certificate?._id)}>Approve</Button>
                            )}

                        </CardActions>

                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
