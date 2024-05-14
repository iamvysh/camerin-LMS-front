import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button,  Modal, Box,Typography,} from '@mui/material';

const StudentPayment = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [selectedPayment,setSelectedPayment] = useState()
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    const paymentData = paymentList.find(payment => payment._id === id);
    setSelectedPayment(paymentData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



   console.log('selec',paymentList)
   

  const fetchPayments = async () => {
    try {

        const studentId = localStorage.getItem("studentId")
      const response = await axios.get(`/getfee/${studentId}`); 
      setPaymentList(response.data.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);


  const initPayment = (data) => {
    const options = {
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      image:
        "https://img.freepik.com/premium-vector/fast-play-symbol-logo-with-letter-f_45189-7.jpg?w=740",
      order_id: data.id,
      handler: async (response) => {
        try {
         
          const studentId = localStorage.getItem("studentId");

        

          const { data } = await axios.post(`/student/verifypayment/${studentId}/${selectedPayment?._id}`, {
            ...response,
           
          });
          console.log(data);
          if (data) {
            fetchPayments()
            handleClose()
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
    
    
     
        const { data } = await axios.post(`/student/payment`, {
          amount: selectedPayment.amount
        });
        console.log(data);
        initPayment(data.data);
  
        console.log('Processing payment for ID:', paymentId);
    
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  
  return (
    <>
    <TableContainer component={Paper}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {paymentList?.map((payment) => {
        
                const isStudentIncluded = payment?.students?.find(student => student.student === localStorage.getItem("studentId"));
  
                const isPayable = isStudentIncluded.isPayed === false ;

                return (
                    <TableRow key={payment?._id}>
                        <TableCell>{payment?.title}</TableCell>
                        <TableCell>{payment?.amount}</TableCell>
                        <TableCell>{payment?.DueDate}</TableCell>
                        <TableCell>
                            {isPayable ? (
                                <Button variant="contained" color="primary"
                            
                                 onClick={() => handleOpen(payment?._id)}
                                
                                >Pay</Button>
                            ) : (
                                <Button disabled variant="contained" color="secondary">Paid</Button>
                            )}
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    </Table>
</TableContainer>
<Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      borderRadius: "20px",
                    }}
                  >
                    <Typography
                      id="modal-modal-description"
                      variant="h5"
                      sx={{ color: "black", textAlign: "center" }}
                    >
                      Proceed with Payment
                    </Typography>
                    <span
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        onClick={() => handlePayment()} 
                        sx={{ mt: 2, color: "green" }}
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={handleClose}
                        sx={{ mt: 2, color: "red" }}
                      >
                        No
                      </Button>
                    </span>
                  </Box>
                </Modal>
</>
  );
};

export default StudentPayment;
