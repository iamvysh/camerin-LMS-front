import React, { useState } from 'react';
import axios from "../../utils/axiosInstance"
import {Select,MenuItem ,TextField, Button, Container, Typography, Grid ,CircularProgress} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import toast, { Toaster } from "react-hot-toast";


const RegisterForm = () => {

    const nav = useNavigate()
    const[Loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    userType: 'a',
    userFullName: '',
    age: '',
    dob: '',
    gender: 'a',
    course:'a',
    address: '',
    mobileNumber: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (formData.userType == 'a') {
      newErrors.userType = 'User type is required';
      valid = false;
    }

    if (!formData.userFullName) {
      newErrors.userFullName = 'Full name is required';
      valid = false;
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
      valid = false;
    }

    if (!formData.dob) {
        newErrors.dob = 'dob is required';
        valid = false;
      }

      if (formData.gender == "a") {
        newErrors.gender = 'gender is required';
        valid = false;
      }

      if (formData.course == "a") {
        newErrors.course = 'course is required';
        valid = false;
      }

      if (!formData.address) {
        newErrors.address = 'address is required';
        valid = false;
      }

      if (formData.mobileNumber.length !== 10) {
        newErrors.mobileNumber = 'mobileNumber must be 10 digits';
        valid = false;
      }


    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

  
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post('/register', formData);
      setLoading(false)
      console.log(response.data); 
      toast.success("Registration Successful", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          color: "#000",
        },
      });
      nav("/login")
    } catch (err) {
      setLoading(false)
      toast.error(err.response.data.message, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#e24242",
          color: "#fff",
        },
      });
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select
              fullWidth
              label="User Type"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <MenuItem value="a">select user type</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
            {errors.userType && <Typography color="error">{errors.userType}</Typography>}
            <TextField
              fullWidth
              label="Full Name"
              name="userFullName"
              value={formData.userFullName}
              onChange={handleChange}
            />
             {errors.userFullName && <Typography color="error">{errors.userFullName}</Typography>}
             <Select
              fullWidth
              label="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <MenuItem value="a">select course</MenuItem>
              <MenuItem value="BBA">BBA</MenuItem>
              <MenuItem value="MBA">MBA</MenuItem>
              <MenuItem value="B.Com">B.Com</MenuItem>
              <MenuItem value="M.Com">M.Com</MenuItem> 
              <MenuItem value="BCA">BCA</MenuItem>
              <MenuItem value="MCA">MCA</MenuItem>
            </Select>
            {errors.course && <Typography color="error">{errors.course}</Typography>}
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
             {errors.age && <Typography color="error">{errors.age}</Typography>}
            <TextField
              fullWidth
              type='date'
              label="DOB"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </Grid>
         
          <Grid item xs={6}>
         
             <Select
              fullWidth
              label="Gender"
              name="gender"
              value={formData?.gender}
              onChange={handleChange}
            >
              <MenuItem value="a">select Gender</MenuItem>
              <MenuItem value="student">Male</MenuItem>
              <MenuItem value="teacher">Female</MenuItem>
            </Select>
            {errors.gender && <Typography color="error">{errors.gender}</Typography>}
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData?.address}
              onChange={handleChange}
            />
            {errors.address && <Typography color="error">{errors.address}</Typography>}
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={formData?.mobileNumber}
              onChange={handleChange}
            />
              {errors.mobileNumber && <Typography color="error">{errors.mobileNumber}</Typography>}
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
            />

{errors.email && <Typography color="error">{errors.email}</Typography>}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData?.password}
              onChange={handleChange}
            />
             {errors.password && <Typography color="error">{errors.password}</Typography>}
          </Grid>
        </Grid>{Loading?(<CircularProgress/>):(
          <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
        )}
        
      </form>
      <Toaster />
    </Container>
  );
};

export default RegisterForm;
