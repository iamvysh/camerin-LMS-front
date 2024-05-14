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
    background-image: url('https://images.unsplash.com/photo-1554755229-ca4470e07232?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-size: cover; 
    background-repeat: no-repeat; 
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
                            style={{ textAlign: "center", }}
                        >
                            {" "}
                            <h2>Teacher</h2>
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<TeacherProfile/>)}
                          style={{ backgroundColor: children.type === TeacherProfile ? "#FFFFFF" : "" }} >
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Students/>)}
                        style={{ backgroundColor: children.type === Students ? "#FFFFFF" : "" }} >
                            Students
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Attendance/>)}
                         style={{ backgroundColor: children.type === Attendance ? "#FFFFFF" : "" }} >
                            Attendance
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<AttendenceRegister/>)} 
                         style={{ backgroundColor: children.type === AttendenceRegister ? "#FFFFFF" : "" }} >
                            Attendence Register
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<DailyReport/>)}
                         style={{ backgroundColor: children.type === DailyReport ? "#FFFFFF" : "" }} >
                            Daily Report
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Calender/>)}
                          style={{ backgroundColor: children.type === Calender ? "#FFFFFF" : "" }}>
                            Calender
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<LeaveReport/>)}
                         style={{ backgroundColor: children.type === LeaveReport ? "#FFFFFF" : "" }} >
                            Leave Report
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Homework/>)}
                         style={{ backgroundColor: children.type === Homework ? "#FFFFFF" : "" }} >
                            Home Work
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Assignment/>)}
                         style={{ backgroundColor: children.type === Assignment ? "#FFFFFF" : "" }}>
                            Assignment
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Notice/>)}
                          style={{ backgroundColor: children.type === Notice ? "#FFFFFF" : "" }} >
                            Notice
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Fee/>)} 
                        style={{ backgroundColor: children.type === Fee ? "#FFFFFF" : "" }} >
                            Fee
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<Seminar/>)} 
                        style={{ backgroundColor: children.type === Seminar ? "#FFFFFF" : "" }} >
                            Seminar
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<MarkCard/>)} 
                         style={{ backgroundColor: children.type === MarkCard ? "#FFFFFF" : "" }}>
                        Mark Card
                        </MenuItem>
                        {/* <MenuItem onClick={() => setChildren(<Exam/>)} >
                            Exam
                        </MenuItem> */}
                        <MenuItem onClick={() => setChildren(<ExamTimetable/>)}
                        style={{ backgroundColor: children.type === ExamTimetable ? "#FFFFFF" : "" }} >
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