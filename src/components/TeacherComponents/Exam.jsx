import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  Modal,
} from "@mui/material";
import axios from "../../../utils/axiosInstance";
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

const Exam = () => {
  const [exams, setexams] = useState([]);
  const [submittedStudents, setSubmittedStudents] = useState([]);
  const [title, setTitle] = useState("");
  const [endTime,setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [images, setImages] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState({
    title: false,
    date: false,
    images: false,
  });

  const handleImageChange = (event) => {
    setImages(event.target.files[0]);
  };
  console.log("first", submittedStudents);

  useEffect(() => {
    fetchexams();
  }, []);

  const fetchexams = async () => {
    try {
      const teacherId = localStorage.getItem("teacherId");
      const response = await axios.get(`/getallexams/${teacherId}`);
      setexams(response.data.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!title || !date || !images || !time || !endTime) {
        setError({
          title: !title,
          date: !date,
          images: !images,
          time: !time,
          endTime: !endTime
        });
        return;
      }
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("images", images);
      formData.append("endTime",endTime)

      const teacherId = localStorage.getItem("teacherId");
      const response = await axios.post(`/addexam/${teacherId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      toast.success("Exam  created Successfully", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          color: "#000",
        },
      });

      console.log("Exam created successfully:", response.data);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#e24242",
          color: "#fff",
        },
      });
      console.error("Error creating exam:", error);
    }
  };

  const fetchSubmittedStudents = async (examId) => {
    try {
      setOpen(true);
      const response = await axios.get(`/getallsubmittedstudents/${examId}`);
      setSubmittedStudents(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#e24242",
          color: "#fff",
        },
      });
      console.error("Error fetching students:", error);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Create Exam
        </Typography>
        <Box>
          <TextField
            label="Exam Name"
            variant="outlined"
            value={title}
            error={error.title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            value={date}
            error={error.date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Start Time"
            type="time"
            variant="outlined"
            value={time}
            error={error.time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
           <TextField
            label="End Time"
            type="time"
            variant="outlined"
            value={endTime}
            error={error.endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <input
            required
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
            style={{ margin: "10px 0" }}
          />
          {error.images && (
            <Typography variant="caption" color="error">
              Please select an image file.
            </Typography>
          )}

          {loading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create Exam
            </Button>
          )}
        </Box>
        <Toaster />
      </Box>
      <Grid container spacing={3} sx={{ marginTop: "60px" }}>
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
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fetchSubmittedStudents(exams?._id)}
                  >
                    view submitted students
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
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "20px",
                  width: "60vh",
                  margin: "auto",
                  marginTop: "100px",
                  height: "50vh",
                }}
              >
                <Typography variant="h5" align="center">
                  Student Details
                </Typography>
                <Box>
                  {submittedStudents.map((details, index) => (
                    <Box key={index}>
                      <Box>
                        Student Name: {details?.studentId?.userFullName}
                      </Box>
                      <Box>
                        contact Number: {details?.studentId?.mobileNumber}
                      </Box>
                      <br />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Modal>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Exam;
