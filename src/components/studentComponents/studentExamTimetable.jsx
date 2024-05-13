import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, styled } from "@mui/material";

const MainContainer = styled(Box)(({ theme }) => ({
   
}));

const MainTitle = styled(Box)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));

const SubContainer = styled(Box)(({ theme }) => ({
  
}));

export default function StudentExamTimetable() {
    const [timetables, setTimetables] = useState([]);

    const fetchTimetables = async () => {
        try {
            const studentId = localStorage.getItem("studentId");
            const response = await axios.get(`/gettimetabeletostudent/${studentId}`);
            setTimetables(response.data.data);
        } catch (error) {
            console.error("Error getting Time Tables:", error);
        }
    };

    useEffect(() => {
        fetchTimetables();
    }, []);

    return (
        <MainContainer>
            <MainTitle>Time Tables</MainTitle>
            <SubContainer>
                {timetables.map((timetable, index) => (
                    <div key={index}>
                        <Typography variant="h6" gutterBottom>
                           <br />
                           <br />
                           <br />
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label={`simple table ${index}`}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time Slot</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {timetable?.timetable.map((entry, subIndex) => (
                                        <TableRow key={`${index}-${subIndex}`}>
                                            <TableCell>{entry?.subject}</TableCell>
                                            <TableCell>{entry?.date}</TableCell>
                                            <TableCell>{entry?.timeslot}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))}
            </SubContainer>
        </MainContainer>
    );
}
