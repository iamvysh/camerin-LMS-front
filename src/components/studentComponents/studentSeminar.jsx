import React, { useState, useEffect } from "react";
import axios from '../../../utils/axiosInstance'

import { Box, Card, Grid, Modal, Typography, styled,CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

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
const SeminarCard = styled(Card)(({ theme }) => ({
    width: "100%",
    minHeight: "15rem",
    marginTop: "2rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
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
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    display: 'flex',
    flexDirection: 'column',
};

export default function StudentSeminar() {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState([]);
    const[Loading,setLoading]=useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [seminars, setSeminars] = useState([]);

    console.log('first',file)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentId = localStorage.getItem("studentId");
                const response = await axios.get(`/getseminartostudent/${studentId}`);
                setSeminars(response.data.data);
            } catch (error) {
                console.error('Error fetching seminar data:', error);
            }
        };

        fetchData();
    }, []);

    const handleImageUpload = (event) => {
        const selectedFile = event.target.files;
        setFile(selectedFile);
    };

    const handleSubmit = async (seminarId) => {
        try {
            setLoading(true)
            const formData = new FormData();
            for (let i = 0; i < file.length; i++) {
                formData.append('images', file[i]);
            }

            const studentId = localStorage.getItem("studentId")

            const response = await axios.post(`/seminar/${seminarId}/students/${studentId}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); 
            setLoading(false)
            handleClose()
            toast.success("Seminar Uploaded Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });

             console.log('second',response.data.data)
           
        } catch (error) {
            setLoading(false)
            console.error('Error uploading image:', error);
            toast.error(error.response.data.message, {
                duration: 3000,
                style: {
                  borderRadius: "10px",
                  background: "#e24242",
                  color: "#fff",
                },
              });
        }
    };

    return (
        <MainContainer>
            <MainTitle>
                Seminars
            </MainTitle>
            <SubContainer>
                <GridContainer container spacing={2}>
                    {seminars?.map((seminar, index) => (
                        <GridItem key={index} item xs={12} md={6}>
                            <SeminarCard>
                                <Box>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <CardTitle>{seminar?.title}</CardTitle>
                                        <Typography sx={{ fontSize: "15px" }}><span style={{fontSize:'12px'}}>Last date to submit</span> {seminar.deadLine}</Typography>
                                    </Box>
                                    <CardDec>{seminar?.description}</CardDec>
                                </Box>
                                <button
                                    onClick={handleOpen}
                                    style={{
                                        alignSelf: "flex-end",
                                        background: "transparent",
                                        border: "1px solid grey",
                                        borderRadius: "5px",
                                        padding: "5px",
                                        fontSize: "14px",
                                    }}
                                >
                                    Attach
                                </button>
                            </SeminarCard>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Add File
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Must Upload the full report.
                                    </Typography>
                                    <input
                        required={true}
                        type="file"
                        name="images"
                        accept=".png, .jpg, .jpeg"
                        maxfilesize={10000000}
                        multiple
                        onChange={handleImageUpload}
                    />{
                        Loading?(<CircularProgress/>):(



                                    <button
                                     onClick={() => handleSubmit(seminar._id)}
                                        style={{
                                            alignSelf: "flex-end",
                                            background: "transparent",
                                            border: "1px solid grey",
                                            borderRadius: "5px",
                                            padding: "5px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Submit
                                    </button>
                        )
                    }
                                </Box>
                            </Modal>
                        </GridItem>
                    ))}
                </GridContainer>
            </SubContainer>
            
      <Toaster />
        </MainContainer>
    );
}
