import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from '../../../utils/axiosInstance';

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function Mycalendar() {
  const [eventsData, setEventsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStart, setNewEventStart] = useState(null);
  const [newEventEnd, setNewEventEnd] = useState(null);

  console.log(eventsData)

  const handleSelect = ({ start, end }) => {
    setNewEventStart(start);
    setNewEventEnd(end);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setNewEventTitle('');
    setNewEventStart(null);
    setNewEventEnd(null);
  };

  const fetchEvents = async (req,res) => {
try{
    const teacherId = localStorage.getItem("teacherId")

    const response = await axios.get(`/calender/geteventtoteacher/${teacherId}`)
    setEventsData(response.data.Data)
}
catch{
    console.error('Error fetching event:', error);
}
  }

  useEffect(() => {
    fetchEvents()
  },[])

  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    
    </div>
  );
}
