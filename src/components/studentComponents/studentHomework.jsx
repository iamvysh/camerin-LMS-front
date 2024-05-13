import React,{useState,useEffect} from 'react';
import { Container, Typography, TextField, Button, Box,List,ListItem,Card,CardContent} from '@mui/material';
import axios from "../../../utils/axiosInstance"
import { Edit, Delete } from '@mui/icons-material';

const StudentHomework = () => {

    const [homeworks, setHomeworks] = useState([]);

    console.log('first',homeworks)

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {

            const studentId = localStorage.getItem("studentId")
          const response = await axios.get(`/gethomeworktostudent/${studentId}`);
          setHomeworks(response.data.data);
          console.log(response.data)

          
        } catch (error) {
          console.error('Error fetching homeworks:', error);
        }
      };
    



  return (
    <>

    { homeworks.length==0?(<h3 className='text-center'>You have No Homework today</h3>):(



     <Box sx={{ marginY: "5%", marginX: "40px", }}>
      <List>
        {homeworks?.map((homework) => (
          <ListItem key={homework?.id}>
            <Card sx={{width:"300px",minHeight:'150px'}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {homework?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ wordWrap:'break-word'}}>
                  {homework?.description}
                </Typography>
                <br />
                <br />
                <Typography variant="body2" color="text.secondary">
                  Deadline: {homework?.expireAt}
                </Typography>
              </CardContent>
              <CardContent>
            <Button onClick={() => window.print()}>print</Button>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
    )


    }
  </>
  );
};

export default StudentHomework;