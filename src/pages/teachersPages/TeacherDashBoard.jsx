import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TeacherProfile from "../../components/TeacherComponents/Profile";
import ExamTimetable from "../../components/TeacherComponents/ExamTimetable";
import MarkCard from "../../components/TeacherComponents/MarkCard";
import Notice from "../../components/TeacherComponents/Notice";
import Seminar from "../../components/TeacherComponents/Seminar";
import Assignment from "../../components/TeacherComponents/Assignment";
import Fee from "../../components/TeacherComponents/Fee";
import Homework from "../../components/TeacherComponents/Homework";
import LeaveReport from "../../components/TeacherComponents/LeaveReport";
import Students from "../../components/TeacherComponents/Students";
import Calender from "../../components/TeacherComponents/Calender";
import DailyReport from "../../components/TeacherComponents/DailyReport";
import Attendance from "../../components/TeacherComponents/Attendance";
import AttendenceRegister from "../../components/TeacherComponents/AttendenceRegister";



const SideBars = styled(Sidebar)`
    .ps-sidebar-container {
        background: transparent;
    }
`;

const TeacherDashBoard = () => {
    const { collapseSidebar } = useProSidebar();
    const [children, setChildren] = useState(<TeacherProfile/>);
    const nav = useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem("studentId")
        nav("/login")
    }

    return (
        <>
            <div style={{ height: "100vh", display: "flex" }}>
                <SideBars style={{ height: "100vh" }}>
                    <Menu>
                        <MenuItem
                            icon={<MenuOutlinedIcon />}
                            onClick={() => {
                                collapseSidebar();
                            }}
                            style={{ textAlign: "center" }}
                        >
                            {" "}
                            <h2>Teacher</h2>
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<TeacherProfile/>)}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Students/>)}>
                            Students
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Attendance/>)} >
                            Attendance
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<AttendenceRegister/>)} >
                            Attendence Register
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<DailyReport/>)} >
                            Daily Report
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Calender/>)}>
                            Calender
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<LeaveReport/>)} >
                            Leave Report
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Homework/>)} >
                            Home Work
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Assignment/>)}>
                            Assignment
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Notice/>)} >
                            Notice
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Fee/>)} >
                            Fee
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Seminar/>)} >
                            Seminar
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<MarkCard/>)} >
                        Mark Card
                        </MenuItem>
                        {/* <MenuItem onClick={() => setChildren(<Exam/>)} >
                            Exam
                        </MenuItem> */}
                        <MenuItem onClick={() => setChildren(<ExamTimetable/>)} >
                            Time Table
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            Logout
                        </MenuItem>
                    </Menu>
                </SideBars>
                <Box sx={sx.renderComponent}>{children}</Box>
            </div>
        </>
    );
};

const sx = {
    renderComponent: {
        height: "100vh",
        width: "100%",
        overflow: "auto",
        padding: "30px",
    },
};

export default TeacherDashBoard;