import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../../utils/axiosInstance'
import toast, { Toaster } from "react-hot-toast";

export default function ViewAssignment() {

    const [data, setData] = useState([])
    const [score,setScore] = useState()

    console.log('score',score)

    console.log("data",data)

    const { id } = useParams()

    const fetchAssignment = async() => {
        try {
            const response =await axios.get(`/assignments/${id}`)

            setData(response?.data?.students)

            console.log('first,response',response)
        }
        catch (error) {
            console.error("error fetching data",error)
        }
    }


    const handleMarkUpdate = async(studentId) => {
        try{

            const response = await axios.put(`/assignment/${id}/${studentId}`,{
                score
            })
            toast.success("score updated Successfully", {
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  color: "#000",
                },
              });

            console.log(response.data)

        }catch(err){
            console.error("mark not uploaded",err)
            toast.error(err.response.data.message, {
                duration: 3000,
                style: {
                  borderRadius: "10px",
                  background: "#e24242",
                  color: "#fff",
                },
              });
        }
    }
 

    useEffect(() => {
        fetchAssignment()
    },[])

    return (
        
        <div>
        {data.length === 0 ? (
            <p>No data found</p>
        ) : (
            <div>
             
                {data.map((student, index) => (
                       <>
                    {/* <div key={student?._id} style={{ display: 'flex', alignItems: 'center', marginLeft: '100px', margin: '30px', border: '1px solid ', padding: "3%" }}> */}
                        <div style={{ width: '150px', display: 'flex', marginLeft: '100px' }}>
                            {student?.imagefile?.map((image, imageIndex) => (
                                <img style={{ width: '300px', height: "300px" }} key={imageIndex} src={image?.url} alt={`Student ${index + 1} image`} />
                            ))}
                        </div>
                        <div style={{ marginLeft:'100px' }}>
                            <h6>student name: {student?.student?.userFullName}</h6>
                            <input
                                type="number"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                            />
                            <button onClick={() => handleMarkUpdate(student?.student?._id)}>Add Score</button>
                        </div>
                    {/* </div> */}
                    </>
                ))}
              
            </div>
        )}
          <Toaster />
    </div>
         
    )
}
