import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, styled, Box, Grid, Card, Chip } from "@mui/material";
import axios from "../../../utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
const MainContainer = styled(Box)(({ theme }) => ({
    height: "100%",
}));
const LeaveLsits = styled(Box)(({ theme }) => ({
    paddingBottom: "2rem",
}));
const GridContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
}));
const GridItem = styled(Grid)(({ theme }) => ({}));
const LeaveCard = styled(Card)(({ theme }) => ({
    width: "100%",
    minHeight: "15rem",
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

const StudentLeaveReport = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");

    const [Leavelist, setLeavelist] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const studentId = localStorage.getItem("studentId");
            const response = await axios.post(`/addleaverequest/${studentId}`, {
                Date: date,
                description: content,
            });
            fetchLeaveReports()
            toast.success("Leave report submitted Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });

            console.log("Leave report added:", response.data);


            setTitle("");
            setDate("");
            setContent("");
        } catch (error) {
            console.error("Error adding leave report:", error);
            toast.error(error.response.data.message, {
                duration: 3000,
                style: {
                  borderRadius: "10px",
                  background: "#e24242",
                  color: "#fff",
                },
              });
            // Handle error
        }
    };

    const fetchLeaveReports = async () => {
        try {
            const studentId = localStorage.getItem("studentId");
            const fetchResponse = await axios.get(`/getstatus/${studentId}`);
            console.log("response", fetchResponse);
            setLeavelist(fetchResponse.data.data);
        } catch (error) {
            console.error("Error getting leave reports:", error);
        }
    };
    useEffect(() => {
        fetchLeaveReports();
    }, []);

    console.log("leaves", Leavelist);

    return (
        <MainContainer>
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                    Add Leave Report
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        label="Title"
                        fullWidth
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        required
                        label="Date"
                        fullWidth
                        margin="normal"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                    required
                        label="Content"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Container>
            <LeaveLsits>
                <GridContainer container spacing={2}>
                    <GridItem item xs={12} md={6}>
                        {Leavelist?.map((data, index) => (
                            <LeaveCard key={index}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <CardTitle>{data?.Date}</CardTitle>
                                    <Chip
                                        sx={{
                                            padding: "2px 0",
                                            height: "fit-content",
                                            fontSize: "12px",
                                        }}
                                        label={data.isApproved ? "approved" : "pending"}
                                        color={data.isApproved  ? "success" : "error"}
                                        variant="outlined"
                                    />
                                </Box>
                                <CardDec>{data?.description}</CardDec>
                                <button
                                    style={{
                                        alignSelf: "flex-end",
                                        padding: "5px",
                                        cursor: "pointer",
                                        background: "transparent",
                                        border: "1px solid grey",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Remove
                                </button>
                            </LeaveCard>
                        ))}
                    </GridItem>
                </GridContainer>
            </LeaveLsits>
            <Toaster />
        </MainContainer>
    );
};

export default StudentLeaveReport;
