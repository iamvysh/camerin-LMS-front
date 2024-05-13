import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";

import { Box, Card, Grid, Typography, styled } from "@mui/material";

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
    minHeight: "5rem",
    marginTop: "2rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));
const CardDec = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    lineHeight: "2rem",
}));

const LeaveReport = () => {
    const [leaveReports, setLeaveReports] = useState([]);

    console.log('first,',leaveReports)

    const fetchLeaveReports = async () => {
        try {
            const teacherId = localStorage.getItem("teacherId");
            const response = await axios.get(`/getleavereports/${teacherId}`);
            setLeaveReports(response?.data?.data);
        } catch (error) {
            console.error("Error getting leave reports:", error);
        }
    };

    const approveRequest = async(id) => {

    const response = await axios.put(`approverequest/${id}`)

    console.log('response',response)
    }

    useEffect(() => {
        fetchLeaveReports();
    }, []);

    console.log(leaveReports);

    return (
        <MainContainer>
            <MainTitle>
                <MainTitle>Leave Reports</MainTitle>
            </MainTitle>
            <SubContainer>
                <GridContainer container spacing={2}>
                    {leaveReports?.map((leave) => (
                        <GridItem item xs={12} md={6}>
                            <LeaveCard>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography>{leave?.studentId?.userFullName}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography>{leave?.Date}</Typography>
                                </Box>
                                <CardDec>{leave?.description}</CardDec>
                                <Box sx={{ alignSelf: "flex-end" }}>
                                    <button
                                        style={{
                                            padding: "5px",
                                            cursor: "pointer",
                                            background: "transparent",
                                            border: "1px solid grey",
                                            borderRadius: "5px",
                                        }}
                                        onClick={() => approveRequest(leave._id)}
                                    >
                                        Approve
                                    </button>
                                    {/* <button
                                        style={{
                                            marginLeft: ".5rem",
                                            padding: "5px",
                                            cursor: "pointer",
                                            background: "transparent",
                                            border: "1px solid grey",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        Not approve
                                    </button> */}
                                </Box>
                            </LeaveCard>
                        </GridItem>
                    ))}
                </GridContainer>
            </SubContainer>
        </MainContainer>
    );
};

export default LeaveReport;
