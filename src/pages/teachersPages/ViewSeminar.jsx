// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from '../../../utils/axiosInstance'


// import toast, { Toaster } from "react-hot-toast";

// export default function () {

//     const [data, setData] = useState([])
//     const [score,setScore] = useState()

//     console.log('score',score)

//     console.log("data",data)

//     const { id } = useParams()

//     const fetchAssignment = async() => {
//         try {
//             const response =await axios.get(`/seminar/${id}`)

//             setData(response?.data?.students)

//             console.log('first,response',response)
//         }
//         catch (error) {
//             console.error("error fetching data",error)
//         }
//     }


//     const handleMarkUpdate = async(studentId) => {
//         try{

//             const response = await axios.put(`/seminar/${id}/${studentId}`,{
//                 score
//             })
//             toast.success("score updated Successfully", {
//                 duration: 5000,
//                 style: {
//                   borderRadius: "10px",
//                   color: "#000",
//                 },
//               });

//             console.log(response.data)

//         }catch(err){
//             console.error("mark not uploaded",err)
//             toast.error(err.response.data.message, {
//                 duration: 3000,
//                 style: {
//                   borderRadius: "10px",
//                   background: "#e24242",
//                   color: "#fff",
//                 },
//               });
//         }
//     }
 

//     useEffect(() => {
//         fetchAssignment()
//     },[])

//     return (
        
//         <div>
//         {data.length === 0 ? (
//             <p>No data found</p>
//         ) : (
//             <div>
//                 {data?.map((student, index) => (
//                     <>
//                     {/* <div key={student?._id} style={{ display: 'flex', alignItems: 'center', marginLeft: '100px', margin: '30px', border: '1px solid ', padding: "3%" }}> */}
//                         <div style={{ width: '150px', display: 'flex', marginLeft: '100px' }}>
//                             {student?.imagefile?.map((image, imageIndex) => (
//                                 <img style={{ width: '300px', height: "300px" }} key={imageIndex} src={image?.url} alt={`Student ${index + 1} image`} />
//                             ))}
//                         </div>
//                         <div style={{marginLeft:'100px' }}>
//                             <h6>student name: {student?.student?.userFullName}</h6>
//                             <input
//                                 type="number"
//                                 value={score}
//                                 onChange={(e) => setScore(e.target.value)}
//                             />
//                             <button onClick={() => handleMarkUpdate(student?.student?._id)}>Add Score</button>
//                         </div>
//                     {/* </div> */}
//                     </>
//                 ))}
//             </div>
//         )}
//         <Toaster />
//     </div>
         
//     )
// }
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../utils/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import { Grid, Card, CardMedia, CardActions, Button, Typography, Box, Modal, TextField } from '@mui/material';
import FileSaver from 'file-saver';

export default function ViewSeminar() {
    const [data, setData] = useState([]);
    const [score, setScore] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchAssignment();
    }, []);

    const fetchAssignment = async () => {
        try {
            const response = await axios.get(`/seminar/${id}`);
            setData(response?.data?.students);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleDownloadImages = () => {
        const imageUrls = data.flatMap((student) => student.imagefile.map((image) => image.url));

        imageUrls.forEach((imageUrl, index) => {
            const filename = `image_${index + 1}`;
            FileSaver.saveAs(imageUrl, filename);
        });

        toast.success('Images downloaded successfully', {
            duration: 3000,
            style: {
                borderRadius: '10px',
                background: '#4caf50',
                color: '#fff',
            },
        });
    };

    const handleMarkUpdate = async (studentId) => {
        setSelectedStudentId(studentId);
        setOpenModal(true);
    };

    const handleSubmitMark = async () => {
        try {
            const response = await axios.put(`/seminar/${id}/${selectedStudentId}`, {
                score,
            });
            toast.success('Score updated successfully', {
                duration: 3000,
                style: {
                    borderRadius: '10px',
                    background: '#4caf50',
                    color: '#fff',
                },
            });
            setOpenModal(false);
        } catch (err) {
            console.error('Error updating score', err);
            toast.error(err.response.data.message, {
                duration: 3000,
                style: {
                    borderRadius: '10px',
                    background: '#e24242',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <Box sx={{ margin: '5%' }}>
            {data.length === 0 ? (
                <Typography variant="subtitle1">No data found</Typography>
            ) : (
                <Grid container spacing={3}>
                    {data.map((student, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={student._id}>
                            <Card>
                                <img
                                    component="img"
                                  style={{ maxHeight: '250px', maxWidth: '100%', objectFit: 'contain' }}
                                    src={student.imagefile[0]?.url}
                                    alt={`Student ${index + 1} image`}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    Submitted By: <span style={{ color: 'green' }}>{student.student.userFullName}</span>
                                </Box>
                                <CardActions>
                                    <Button onClick={handleDownloadImages}>Download Images</Button>
                                    <Button onClick={() => handleMarkUpdate(student.student._id)}>Add Mark</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="mark-modal"
                aria-describedby="mark-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 4,
                        minWidth: 400,
                    }}
                >
                    <Typography id="mark-modal" variant="h6" component="h2">
                        Add Mark
                    </Typography>
                    <TextField
                        id="mark"
                        label="Mark"
                        type="number"
                        variant="outlined"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmitMark}>
                        Submit
                    </Button>
                </Box>
            </Modal>
            <Toaster />
        </Box>
    );
}
