import React, { useEffect, useState } from "react";
import axios from '../../../utils/axiosInstance'

import { Box, Card, Grid, Typography, styled, Button } from "@mui/material";
const MainContainer = styled(Box)(({ theme }) => ({}));
const MainTitle = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));
const SubContainer = styled(Box)(({ theme }) => ({}));

const GridContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
}));
const GridItem = styled(Grid)(({ theme }) => ({}));
const LeaveCard = styled(Card)(({ theme }) => ({
    width: "100%",
    minHeight: "25rem",
    marginTop: "2rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "10rem",
    border: "1px solid black"
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));
const CardDec = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    lineHeight: "2rem",

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
                <MainTitle>Notice</MainTitle>
            </MainTitle>
            <SubContainer>
                <GridContainer container spacing={2}>
                    <GridItem item xs={12} md={6}>
                        <LeaveCard>
                            {notices?.map((data, index) => (
                                <div key={index} style={{border:'1px solid black',padding:"10%"}}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <CardTitle variant="h6">{data?.title}</CardTitle>
                                        <Typography variant="body1">{data?.Date}</Typography>
                                    </Box>
                                    <CardDec variant="body2">{data?.description}</CardDec>

                                </div>
                            ))}
                        </LeaveCard>
                    </GridItem>
                </GridContainer>
            </SubContainer>
        </MainContainer>
    );
}
