import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';

const StudentPayment = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [selectedPayment,setSelectedPayment] = useState()

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

  const handlePayment = async (paymentId) => {
    try {
      const paymentData = paymentList.find(payment => payment._id === paymentId);
      if (paymentData) {
        setSelectedPayment(paymentData);
        
     
        const { data } = await axios.post(`/student/payment`, {
          amount: selectedPayment.amount
        });
        console.log(data);
        initPayment(data.data);
  
        console.log('Processing payment for ID:', paymentId);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  
  return (
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
          {paymentList?.map((payment) => (
            <TableRow key={payment?.id}>
              <TableCell>{payment?.title}</TableCell>
              <TableCell>{payment?.amount}</TableCell>
              <TableCell>{payment?.DueDate}</TableCell>
              <TableCell>
             
                <Button variant="contained" color="primary" onClick={() => handlePayment(payment?._id)}>Pay</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentPayment;
