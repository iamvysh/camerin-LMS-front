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
    background-image: url('https://images.unsplash.com/photo-1554755229-ca4470e07232?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-size: cover; 
    background-repeat: no-repeat; 
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
                        <MenuItem onClick={() => setChildren(<StudentProfile/>)}
                        style={{ backgroundColor: children.type === StudentProfile ? "#FFFFFF" : "" }} >
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentAssignment/>)}
                        style={{ backgroundColor: children.type === StudentAssignment ? "#FFFFFF" : "" }} >
                   Assignment
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentAttendance/>)} 
                        style={{ backgroundColor: children.type === StudentAttendance ? "#FFFFFF" : "" }} >
                       Attendance
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentCalender/>)}
                        style={{ backgroundColor: children.type === StudentCalender ? "#FFFFFF" : "" }}  >
                       Calender
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentDailyReports/>)}
                        style={{ backgroundColor: children.type === StudentDailyReports ? "#FFFFFF" : "" }} >
                    Daily Reports
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentExamTimetable/>)} 
                        style={{ backgroundColor: children.type === StudentExamTimetable ? "#FFFFFF" : "" }} >
                        ExamTimetable
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentHomework/>)}
                        style={{ backgroundColor: children.type === StudentHomework ? "#FFFFFF" : "" }}  >
                    Homework
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentLeaveReport/>)}
                        style={{ backgroundColor: children.type === StudentLeaveReport ? "#FFFFFF" : "" }} >
                 Leave Report
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentLibrary/>)}
                        style={{ backgroundColor: children.type === StudentLibrary ? "#FFFFFF" : "" }}  >
                       Library
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentMarkCard/>)}
                        style={{ backgroundColor: children.type === StudentMarkCard ? "#FFFFFF" : "" }}  >
                      MarkCard
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentNotice/>)}
                        style={{ backgroundColor: children.type === StudentNotice ? "#FFFFFF" : "" }}  >
                      Notice
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentPayment/>)}
                        style={{ backgroundColor: children.type === StudentPayment ? "#FFFFFF" : "" }}  >
                      Payment
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentReturnBooks/>)} 
                        style={{ backgroundColor: children.type === StudentReturnBooks ? "#FFFFFF" : "" }} >
                    View Books
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentSeminar/>)}
                        style={{ backgroundColor: children.type === StudentSeminar ? "#FFFFFF" : "" }}  >
                   Seminar
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<StudentViewTeachers/>)} 
                        style={{ backgroundColor: children.type === StudentViewTeachers ? "#FFFFFF" : "" }} >
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

