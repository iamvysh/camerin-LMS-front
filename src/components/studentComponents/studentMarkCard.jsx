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
            const response = await axios.get(`/getmarktospecificstudent/${studentId}`);
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
            <MainTitle>Mark list</MainTitle>
            <SubContainer>
                {timetables?.map((timetable, index) => (
                    <div key={index}>
                        <Typography variant="h6" gutterBottom>
                           <br />
                           <br />
                           <br />
                           {timetable?.title}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label={`simple table ${index}`}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>totalmark</TableCell>
                                        <TableCell>Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {timetable?.marksheet.map((entry, subIndex) => (
                                        <TableRow key={`${index}-${subIndex}`}>
                                            <TableCell>{entry?.subject}</TableCell>
                                            <TableCell>{entry?.totalmark}</TableCell>
                                            <TableCell>{entry?.grade}</TableCell>
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
