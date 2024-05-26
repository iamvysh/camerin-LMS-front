import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  CircularProgress,
  Box,


  
} from "@mui/material";
import { saveAs } from "file-saver";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    display: "flex",
    flexDirection: "column",
  };

export default function StudentExam() {
  const [exams, setexams] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState([]);
  const [Loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const nav = useNavigate()

  console.log("first,", exams);

  useEffect(() => {
    fetchexams();
  }, []);

  const fetchexams = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      const response = await axios.get(`/getexam/${studentId}`);
      setexams(response.data.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files;
    setFile(selectedFile);
  };

  const handleSubmit = async (examId) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("images", file[i]);
      }

      const studentId = localStorage.getItem("studentId");

      const response = await axios.post(
        `/submitexam/${studentId}/${examId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      handleClose();
      toast.success("Submitted Successfully", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          color: "#000",
        },
      });

      console.log("second", response.data.data);
    } catch (error) {
      setLoading(false);

      console.error("Error uploading image:", error);
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


  const handleDownload = async (imageUrl) => {
    try {
      saveAs(imageUrl, "image.jpg");

      toast.success("Exam  downloaded Successfully", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          color: "#000",
        },
      });
    } catch (error) {
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
    <>
      <Grid container spacing={3}>
        {exams?.map((exams) => (
          <Grid item key={exams?._id} xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  align="right"
                  color="textSecondary"
                >
                  Date:{exams?.date}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="right"
                  color="textSecondary"
                >
                  Time:{exams?.time}
                </Typography>
                <Typography align="center" gutterBottom>
                  {exams?.title}
                </Typography>
                <img
                  src={exams?.imageFile[0]?.url}
                  alt={exams?.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    margin: "0 auto",
                  }}
                />
              </CardContent>
              <CardActions>
                {/* <CardActions>
                  <Button variant="contained" color="primary"    onClick={handleOpen}>
                    Upload
                  </Button>
                </CardActions> */}
                <CardActions>
                  <Button variant="contained" color="primary"    onClick={() => nav(`/uploadexam/${exams._id}`) }>
                    Upload
                  </Button>
                </CardActions>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDownload(exams?.imageFile[0]?.url)}
                  >
                    Download
                  </Button>
                </CardActions>
              </CardActions>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
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
                  />
                  {Loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      onClick={() => handleSubmit(exams?._id)}
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
                  )}
                </Box>
              </Modal>
          </Grid>
          
        ))}
      </Grid>
     
      <Toaster />
    </>
  );
}