import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  styled,
  Modal,
  CircularProgress,
} from "@mui/material";

const MainContainer = styled(Box)(({ theme }) => ({
  width: "100%",
}));
const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 700,
}));
const SubContainer = styled(Box)(({ theme }) => ({}));
const GridContainer = styled(Grid)(({ theme }) => ({}));
const GridItem = styled(Grid)(({ theme }) => ({}));

const AssignmentCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "300px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const AssignmentTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
}));
const AssignmentDesc = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
}));

const AssingmentDates = styled(Box)(({ theme }) => ({}));
const Dates = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 600,
}));

const backgroundColors = ["#FFF59D", "#FFF176", "#FFEB3B", "#FFD600"];

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

export default function StudentAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const studentId = localStorage.getItem("studentId");
        const response = await axios.get(`/getassignmenttostudent/${studentId}`);
        setAssignments(response.data.Data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, []);

  const handleImageUpload = (event) => {
    const selectedFiles = event.target.files;
    setFile(selectedFiles);
  };

  const handleOpenUploadModal = (assignmentId) => {
    setCurrentAssignmentId(assignmentId);
    setOpenUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setOpenUploadModal(false);
    setFile([]);
  };

  const handleOpenEditModal = (assignmentId) => {
    setCurrentAssignmentId(assignmentId);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setFile([]);
  };

  const handleSubmit = async (assignmentId) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("images", file[i]);
      }

      const studentId = localStorage.getItem("studentId");

      const response = await axios.post(
        `/assignments/${assignmentId}/students/${studentId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      handleCloseUploadModal();
      toast.success("Submitted Successfully", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          color: "#000",
        },
      });
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

  const handleEdit = async (assignmentId) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("images", file[i]);
      }

      const studentId = localStorage.getItem("studentId");

      const response = await axios.put(
        `/updateassignment/${assignmentId}/${studentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      handleCloseEditModal();
      toast.success("Updated Successfully", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          color: "#000",
        },
      });
    } catch (error) {
      setLoading(false);
      console.error("Error editing image:", error);
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
      <MainTitle>Assignments</MainTitle>
      <SubContainer>
        <GridContainer container spacing={2}>
          {assignments?.map((assignment, index) => {
            const isStudentIncluded = assignment?.students?.find(
              (student) => student.student === localStorage.getItem("studentId")
            );
            const isSubmitted = isStudentIncluded?.isSubmitted;
            console.log(isSubmitted)

            return (
              <GridItem key={index} item xs={12} sm={6} md={4} lg={3}>
                <AssignmentCard
                  sx={{
                    backgroundColor:
                      backgroundColors[index % backgroundColors.length],
                  }}
                >
                  <AssignmentTitle>{assignment?.title}</AssignmentTitle>
                  <AssignmentDesc>{assignment?.description}</AssignmentDesc>
                  <AssingmentDates>
                    <Dates>
                      Start: <span>{assignment?.startDate}</span>
                    </Dates>
                    <Dates>
                      End: <span>{assignment?.deadLine}</span>
                    </Dates>
                  </AssingmentDates>
                  {isSubmitted === false ? (
                    <button
                      onClick={() => handleOpenUploadModal(assignment._id)}
                      style={{
                        padding: "2px",
                        fontSize: "15px",
                        background: "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenEditModal(assignment._id)}
                      style={{
                        padding: "2px",
                        fontSize: "15px",
                        background: "transparent",
                        border: "1px solid grey",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  )}
                </AssignmentCard>

                <Modal
                  open={openUploadModal && currentAssignmentId === assignment._id}
                  onClose={handleCloseUploadModal}
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
                    />
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <button
                        onClick={() => handleSubmit(currentAssignmentId)}
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

                <Modal
                  open={openEditModal && currentAssignmentId === assignment._id}
                  onClose={handleCloseEditModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Edit File
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
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <button
                        onClick={() => handleEdit(currentAssignmentId)}
                        style={{
                          alignSelf: "flex-end",
                          background: "transparent",
                          border: "1px solid grey",
                          borderRadius: "5px",
                          padding: "5px",
                          fontSize: "14px",
                        }}
                      >
                        Update
                      </button>
                    )}
                  </Box>
                </Modal>
              </GridItem>
            );
          })}
        </GridContainer>
      </SubContainer>
      <Toaster />
    </MainContainer>
  );
}
