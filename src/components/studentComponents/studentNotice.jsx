import React, { useEffect, useState } from "react";
import axios from '../../../utils/axiosInstance'

import { Box, Card, Grid, Typography, styled, Button } from "@mui/material";
const MainContainer = styled(Box)(({ theme }) => ({
    marginTop: "20px"
}));
const MainTitle = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
    textAlign: "center",
    marginBottom:' 20px'
}));
const SubContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center'
}));

const GridContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
}));
const GridItem = styled(Grid)(({ theme }) => ({}));
const LeaveCard = styled(Card)(({ theme }) => ({
    minWidth: "70vh",
    minHeight: "25rem",
    marginTop: "2rem",
    width: "100%",
    borderRadius: "8px",
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
    padding: '20px',

}));

const CardTitle = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    marginBottom: '10px',
}));
const CardDec = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    lineHeight: "2rem",
    color: "#555555"
}));

export default function StudentNotice() {
    const [notices, setNotices] = useState([]);

    const fetchData = async () => {
        try {
            const studentId = localStorage.getItem("studentId")
            const response = await axios.get(`/getnoticetostudent/${studentId}`)

            setNotices(response.data.data)

        } catch (error) {
            console.error("error fetching data", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <MainContainer>
            <MainTitle>
                <Typography variant="h4">Notice</Typography>
            </MainTitle>
            <SubContainer>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <LeaveCard>
                            {notices?.map((data, index) => (
                                <div key={index} style={{ borderBottom: '1px solid #CCCCCC', marginBottom: '20px', paddingBottom: '20px' }}>
                                    <CardTitle variant="h6">{data?.title}</CardTitle>
                                    <Typography variant="body2" color="textSecondary">{data?.Date}</Typography>
                                    <CardDec variant="body2">{data?.description}</CardDec>
                                    
                                </div>
                            ))}
                        </LeaveCard>
                    </Grid>
                </Grid>
            </SubContainer>
        </MainContainer>
    );
}
