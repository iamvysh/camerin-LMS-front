import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";


import AddBooks from "../../components/LibrarianComponents.jsx/AddBooks";
import ViewBooks from "../../components/LibrarianComponents.jsx/ViewBooks";
import AprovedTransactions from "../../components/LibrarianComponents.jsx/AprovedTransactions";
import UnapprovedTransactions from "../../components/LibrarianComponents.jsx/UnapprovedTransactions";
import RentalDeadline from "../../components/LibrarianComponents.jsx/RentalDeadline";
import OverDueTransactions from "../../components/LibrarianComponents.jsx/OverDueTransactions";
import UnreturnedBooks from "../../components/LibrarianComponents.jsx/UnreturnedBooks";




const SideBars = styled(Sidebar)`
    .ps-sidebar-container {
        background: transparent;
    }
`;

const StudentDashBoard = () => {
    const { collapseSidebar } = useProSidebar();
    const [children, setChildren] = useState(<AddBooks />);
    const nav = useNavigate()

    return (
        <Box sx={{ width: '100%' }}>
            <div style={{ height: "100vh", display: "flex", width: '100%' }}>
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
                            <h4>Hello adarsh</h4>
                        </MenuItem>
                        {/* <MenuItem onClick={() => setChildren(<StudentProfile />)}>
                            Profile
                        </MenuItem> */}
                        <MenuItem onClick={() => setChildren(<AddBooks />)}>
                            Add Books
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<ViewBooks />)} >
                            View Books
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<AprovedTransactions />)} >
                            Approved Transactions
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<UnapprovedTransactions />)}>
                            Unapproved Transactins
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<RentalDeadline />)} >
                            Rental Deadline
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<UnreturnedBooks />)} >
                            UnReturned Books
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<OverDueTransactions />)} >
                            Overdue
                        </MenuItem>
                        <MenuItem onClick={() => nav("/")}>
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

