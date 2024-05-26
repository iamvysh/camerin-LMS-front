import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import toast, { Toaster } from "react-hot-toast";

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

export default function UploadExamPage() {
  const [exams, setExams] = useState([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [submittedExams, setSubmittedExams] = useState([]);
  const { id } = useParams();

  console.log("submitted exams", submittedExams);

  const fetchSubmittedExams = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      const response = await axios.get(`/getexam/${studentId}/${id}`);
      setSubmittedExams(response.data.data);
    } catch (error) {
      console.error("Error fetching submitted exams:", error);
    }
  };

  const fetchExams = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      const response = await axios.get(`/getexam/${studentId}`);
      const filteredExams = response.data.data.filter((item) => item._id === id);
      setExams(filteredExams);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleOpenUploadModal = (exam) => {
    setCurrentExam(exam);
    setOpenUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setOpenUploadModal(false);
    setCurrentExam(null);
    setFile([]);
  };

  const handleOpenEditModal = (exam) => {
    setCurrentExam(exam);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCurrentExam(null);
    setFile([]);
  };

  const handleImageUpload = (event) => {
    const selectedFiles = event.target.files;
    setFile(selectedFiles);
  };

  const handleSubmit = async (examId) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("images", file[i]);
      }

      const studentId = localStorage.getItem("studentId");
      await axios.post(`/submitexam/${studentId}/${examId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      handleCloseUploadModal();
      toast.success("Submitted Successfully", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          color: "#000",
        },
      });

      fetchExams();
      fetchSubmittedExams();
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

  const handleEdit = async (submittedExamId) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("images", file[i]);
      }

      await axios.put(`/updateexam/${submittedExamId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      handleCloseEditModal();
      toast.success("Updated Successfully", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          color: "#000",
        },
      });

      fetchExams();
      fetchSubmittedExams();
    } catch (error) {
      setLoading(false);
      console.error("Error editing:", error);
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

  useEffect(() => {
    fetchExams();
    fetchSubmittedExams();
  }, [id]);

  return (
    <>
      <Box sx={{marginX:'190px',marginY:"20px"}}>
        {exams?.map((exam) => (
          <Grid item key={exam?._id} xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  align="right"
                  color="textSecondary"
                >
                  Date: {exam?.date}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="right"
                  color="textSecondary"
                >
                  Time: {exam?.time}
                </Typography>
                <Typography align="center" gutterBottom>
                  {exam?.title}
                </Typography>
                <img
                  src={exam?.imageFile[0]?.url}
                  alt={exam?.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    margin: "0 auto",
                  }}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenUploadModal(exam)}
                >
                  Upload
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Box>

      <Modal
        open={openUploadModal}
        onClose={handleCloseUploadModal}
        aria-labelledby="upload-modal-title"
        aria-describedby="upload-modal-description"
      >
        <Box sx={style}>
          <Typography id="upload-modal-title" variant="h6" component="h2">
            Add File
          </Typography>
          <Typography id="upload-modal-description" sx={{ mt: 2 }}>
            Must upload the full report.
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
          {loading ? (
            <CircularProgress />
          ) : (
            <button
              onClick={() => handleSubmit(currentExam._id)}
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

      <Box sx={{ width: '100vh', marginTop: '20px',marginX:"50px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Submitted Exams
        </Typography>
        {submittedExams?.map((exam) => (
          <Grid item key={exam?._id} xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <Typography align="center" gutterBottom>
                  {exam?.title}
                </Typography>
                <img
                  src={exam?.imageFile[0]?.url}
                  alt={exam?.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    margin: "0 auto",
                  }}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenEditModal(exam)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
            <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={style}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit File
          </Typography>
          <Typography id="edit-modal-description" sx={{ mt: 2 }}>
            Must upload the full report.
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
          {loading ? (
            <CircularProgress />
          ) : (
            <button
              onClick={() => handleEdit(exam?._id)}
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
      </Box>



      <Toaster />
    </>
  );
}
