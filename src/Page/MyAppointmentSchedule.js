import React, { useContext, useState  } from "react";
import { Container, Table, Alert, Button } from "react-bootstrap";
import AppointmentContext from "../Context/AppointmentContext";
import AuthContext from "../Context/Context";
import { useNavigate } from "react-router-dom";
import patientsData from "../data/patients.json";
import "./Page.css";

export default function MyAppointments() {
  const { appointments } = useContext(AppointmentContext);
  const { user } = useContext(AuthContext);
  const myAppointments = appointments;
  const navigate = useNavigate();

  const [fadeClass, setFadeClass] = useState("fade-in");
  const handleBack = () => {
    setFadeClass("fade-out");
    setTimeout(() => navigate("/"), 400);
  };

  return (
    <div className={`my-appointments-page ${fadeClass}`}>
      <Container className="mt-5">
        <h3 className="text-primary mb-4">My Appointment Schedule 🩺</h3>
        {myAppointments.length === 0 ? (
          <Alert variant="info">You have no booked appointments yet.</Alert>
          ) : (
          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Hospital</th>
                <th>Date</th>
                <th>Time</th>
                <th>Patient</th>
              </tr>
            </thead>
            <tbody>
              {myAppointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.doctor}</td>
                  <td>{a.specialty}</td>
                  <td>{a.hospital}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>{ patientsData.find(p => p.email.toLowerCase() === a.patientEmail?.toLowerCase())?.fullName || a.patientName || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className="text-center mt-4">
          <Button variant="outline-primary" onClick={handleBack}>← Back to Home</Button>
        </div>
      </Container>
    </div>
  );
}
