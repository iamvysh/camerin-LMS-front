import React, { useState, useEffect } from 'react';
import axios from "../../../utils/axiosInstance";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import toast, { Toaster } from "react-hot-toast";

const TeacherProfile = () => {
    const [teacherData, setTeacherData] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teacherId = localStorage.getItem("teacherId");
                const response = await axios.get(`/teacherdata/${teacherId}`);
                setTeacherData(response?.data?.data);
                setFullName(response?.data?.data?.userFullName);
                setEmail(response?.data.data.email);
                setMobileNumber(response?.data?.data?.mobileNumber);
                setAge(response?.data?.data?.age);
                setAddress(response?.data?.data?.address);
            } catch (error) {
                console.error('Error fetching teacher profile data:', error);
            }
        };

        fetchData();
    }, []);

    const validateInputs = () => {
        const errors = {};
        if (!fullName.trim()) {
            errors.fullName = "Full Name is required";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!mobileNumber.trim()) {
            errors.mobileNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            errors.mobileNumber = "Phone number must contain exactly 10 digits";
        }
        if (!age.trim()) {
            errors.age = "Age is required";
        } else if (!/^\d+$/.test(age)) {
            errors.age = "Age must be a number";
        }
        if (!address.trim()) {
            errors.address = "Address is required";
        }
        return errors;
    };

    const handleSubmit = async () => {
        const errors = validateInputs();
        if (Object.keys(errors).length === 0) {
            try {
                const teacherId = localStorage.getItem("teacherId");
                await axios.put(`/updatedteacher/${teacherId}`, {
                    userFullName: fullName,
                    email,
                    mobileNumber,
                    age,
                    address
                });
                console.log('Profile updated successfully');
                toast.success("profile updated Successfully", {
                    duration: 5000,
                    style: {
                      borderRadius: "10px",
                      color: "#000",
                    },
                  });
            } catch (error) {
                console.error('Error updating teacher profile:', error);
                toast.error(error.response.data.message, {
                    duration: 3000,
                    style: {
                      borderRadius: "10px",
                      background: "#e24242",
                      color: "#fff",
                    },
                  });
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <section style={{ backgroundColor: '#eee', height: "100vh" }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBCardText>Full Name</MDBCardText>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                                <MDBCardText>Email</MDBCardText>
                                <input
                                    type="email"
                                    className="form-control mb-4"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                                <MDBCardText>Phone</MDBCardText>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                {errors.mobileNumber && <div className="text-danger">{errors.mobileNumber}</div>}
                                <MDBCardText>Age</MDBCardText>
                                <input
                                    type="number"
                                    className="form-control mb-4"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                {errors.age && <div className="text-danger">{errors.age}</div>}
                                <MDBCardText>Address</MDBCardText>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                {errors.address && <div className="text-danger">{errors.address}</div>}
                                <MDBBtn color="primary" onClick={handleSubmit}>Update Profile</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                
        <Toaster />
            </MDBContainer>
        </section>
    );
};

export default TeacherProfile;
