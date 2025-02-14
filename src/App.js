import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import backgroundImage from "./assets/business.jpg"; // Import local image
import { TablePagination,IconButton,Container, Card, CardContent, Typography, Button, TextField, Grid, AppBar, Toolbar, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TableSortLabel, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import adminImage from "./assets/admin.webp"
import Home from "./components/Homepage";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
 
  alignItems: "center",
  textAlign: "center",
  padding: "20px"
};

const backgroundStyleAdmin = {
  backgroundImage: `url(${adminImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  
  alignItems: "center",
  textAlign: "center",
  padding: "20px"
};



function Home1() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const [blockedSlots, setBlockedSlots] = useState(new Set());
  const availableTimes = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      const booked = new Set(response.data.map(appt => `${appt.date}-${appt.time}`));
      setBookedSlots(booked);
      const blockedResponse = await axios.get("http://localhost:5000/blockedSlots");
      const blocked = new Set(blockedResponse.data.map(slot => `${slot.date}-${slot.time}`));
      setBlockedSlots(blocked);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };


  const isSlotBooked = (date, time) => bookedSlots.has(`${date}-${time}`);

  const bookAppointment = async () => {
    if (!name || !date || !time) return;
    if (isSlotBooked(date, time)) {
      alert("This time slot is already booked. Please choose another.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/appointments", {
        name,
        date,
        time,
      });
      setName("");
      setDate("");
      setTime("");
      fetchSlots();
      alert("Appointment Booked successfully for "+name+" on "+date+" at "+time);
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      console.error("Error booking appointment:", error);
    }
  };

  

  return (
    <div style={backgroundStyle}>
      <AppBar position="static" style={{ backgroundColor: "#002147" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: "#fff" }}>Appointment Booking System</Typography>
          <Button color="inherit" component={Link} to="/admin" style={{ color: "#fff" }}>Admin</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: "40px" }}>
        <Paper elevation={10} style={{ padding: "40px", backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "10px" }}>
          <Typography variant="h4" gutterBottom style={{ color: "#002147" }}>
            Book an Appointment
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth type="date" value={date} onChange={(e) => setDate(e.target.value)} variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Time Slot</InputLabel>
                <Select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {availableTimes.map((slot) => (
                    <MenuItem key={slot} value={slot} disabled={isSlotBooked(date, slot)}>
                      {slot}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" fullWidth onClick={bookAppointment} style={{ marginTop: "20px" }}>
            Book Now
          </Button>
         
        </Paper>
      </Container>
    </div>
  );
}




function Admin() {
  const availableTimes = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchBlockedSlots();
    fetchAppointments();
  }, []);

  const fetchBlockedSlots = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blockedSlots");
      setBlockedSlots(response.data);
    } catch (error) {
      console.error("Error fetching blocked slots:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const blockSlot = async () => {
    if (!date || !time) return;
    try {
      await axios.post("http://localhost:5000/blockedSlots", { date, time });
      fetchBlockedSlots();
    } catch (error) {
      console.error("Error blocking slot:", error);
    }
  };

  const unblockSlot = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/blockedSlots/${id}`);
      fetchBlockedSlots();
    } catch (error) {
      console.error("Error unblocking slot:", error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={backgroundStyleAdmin}>
      <Container maxWidth="lg" style={{ marginTop: "40px" }}>
        <Paper elevation={10} style={{ padding: "40px", backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "10px" }}>
          <Typography variant="h4" gutterBottom style={{ textAlign: "center", fontWeight: "bold" }}>Admin Panel - Block Slots</Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="date" value={date} onChange={(e) => setDate(e.target.value)} variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Time Slot</InputLabel>
                <Select value={time} onChange={(e) => setTime(e.target.value)}>
                  {availableTimes.map((slot) => (
                    <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" color="secondary" fullWidth onClick={blockSlot}>
                Block Slot
              </Button>
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>Blocked Slots</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blockedSlots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>{slot.date}</TableCell>
                  <TableCell>{slot.time}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => unblockSlot(slot.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>Appointments</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.name}</TableCell>
                  <TableCell>{appt.date}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => deleteAppointment(appt.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={appointments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </div>
  );
}
export default function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}