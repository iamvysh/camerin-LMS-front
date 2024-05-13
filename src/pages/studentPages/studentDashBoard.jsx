import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StudentProfile from "../../components/studentComponents/studentProfile";
import StudentAssignment from "../../components/studentComponents/studentAssignment";
import StudentAttendance from "../../components/studentComponents/studentAttendance";
import StudentCalender from "../../components/studentComponents/studentCalender";
import StudentDailyReports from "../../components/studentComponents/studentDailyReports";
import StudentExamTimetable from "../../components/studentComponents/studentExamTimetable";
import StudentHomework from "../../components/studentComponents/studentHomework";
import StudentLeaveReport from "../../components/studentComponents/studentLeaveReport";
import StudentLibrary from "../../components/studentComponents/studentLibrary";
import StudentMarkCard from "../../components/studentComponents/studentMarkCard";
import StudentNotice from "../../components/studentComponents/studentNotice";
import StudentPayment from "../../components/studentComponents/studentPayment";
import StudentReturnBooks from "../../components/studentComponents/studentViewBooks";
import StudentSeminar from "../../components/studentComponents/studentSeminar";
import StudentViewTeachers from "../../components/studentComponents/studentViewTeachers";
 



const SideBars = styled(Sidebar)`
    .ps-sidebar-container {
        background: transparent;
    }
`;

const StudentDashBoard = () => {
    const { collapseSidebar } = useProSidebar();
    const [children, setChildren] = useState(<StudentProfile/>);
    const nav = useNavigate()

    const handleLogOut=()=>{
        localStorage.removeItem("studentId")
        nav('/login')
    }

    return (
        <Box sx={{width:'100%'}}>
            <div style={{ height: "100vh", display: "flex",width:'100%' }}>
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
                            <h2>Student</h2>
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentProfile/>)}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentAssignment/>)}>
                   Assignment
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentAttendance/>)} >
                       Attendance
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentCalender/>)} >
                       Calender
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentDailyReports/>)}>
                    Daily Reports
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentExamTimetable/>)} >
                        ExamTimetable
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentHomework/>)} >
                    Homework
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentLeaveReport/>)}>
                 Leave Report
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentLibrary/>)} >
                       Library
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentMarkCard/>)} >
                      MarkCard
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentNotice/>)} >
                      Notice
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentPayment/>)} >
                      Payment
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentReturnBooks/>)} >
                    View Books
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentSeminar/>)} >
                   Seminar
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentViewTeachers/>)} >
                       ViewTeachers
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            Logout
                        </MenuItem>
                    </Menu>
                </SideBars>
                <Box sx={sx.renderComponent}>{children}</Box>
            </div>
        </Box>
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

export default StudentDashBoard;

