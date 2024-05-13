import React, { useState } from "react";
import { Box, useMediaQuery, Popover, Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";


export default function Navbar() {
  const nav = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [logout,setLogout] = useState(false)

  const userId = localStorage.getItem("userId")

  const handleButtonClick = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

 
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1%",
        }}
      >
        <Box sx={sx.logoStyle} onClick={() => nav("/")}>
         S T U D .com
        </Box>
        <button
          onClick={handleButtonClick}
          style={{
            display: isSmallScreen ? "block" : "none",
            paddingLeft: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <MenuIcon style={{ color: "white" }} />
        </button>

      
        {!isSmallScreen && (
          <>
            <Box sx={{ display: "flex" }}>
            
              <Box sx={sx.navLinks}  onClick={() => nav("/")}>Home</Box>
              <Box sx={sx.navLinks} onClick={() => nav("/librarylogin")}>Librarian</Box>
              <Box
                to="targetFeatures"
                href="#"
                smooth={true}
                duration={1500}
                style={linkStyle}
              >
                 Services
              </Box>
              <Box
                to="targetFooter"
                href="#"
                smooth={true}
                duration={1500}
                style={linkStyle}
              >
                 Contact&nbsp;Us
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#23a6f0",
                cursor: "pointer",
              }}
            >
              <PersonOutlineIcon />
              {localStorage.getItem("userId") ? (
                <Box
                  onClick={() =>
                    {
                      localStorage.removeItem("userId")
                    setLogout(true)
                  console.log('first')}
                  }
                >
                  Logout
                </Box>
              ) : (
                <Box onClick={() => nav("/signup")}>
                  Login&nbsp;/&nbsp;Register&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}

const sx = {
  navLinks: {
    paddingX: "5%",
    cursor: "pointer",
    display: "flex",
  },
  logoStyle: {
    fontSize: { xs: "18px", sm: "20px", md: "22px", lg: "25px" },
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "10%",
  },
  popoverButton: {
    textTransform: "none",
  },
};


const linkStyle = {
  marginRight:"10%",
  fontSize: "100%",
  fontFamily: "var(--font-dmsans)",
  cursor: "pointer",
  textDecoration:"none",  
  color:"inherit"
};