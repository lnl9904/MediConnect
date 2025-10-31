import React, { useContext, useState  } from "react";
import { Container, Table, Alert, Button } from "react-bootstrap";
import AppointmentContext from "../Context/AppointmentContext";
import NotificationContext from "../Context/NotificationContext";
import AuthContext from "../Context/Context";
import { useNavigate } from "react-router-dom";
import patientsData from "../data/patients.json";
import "./Page.css";

export default function MyAppointments() {
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const { addNotification } = useContext(NotificationContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fadeClass, setFadeClass] = useState("fade-in");
  const [message, setMessage] = useState("");
  const handleBack = () => {
    setFadeClass("fade-out");
    setTimeout(() => navigate("/"), 400);
  };

  // 🔹 Khi bệnh nhân huỷ lịch
  const handleCancel = (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    const canceledAppt = appointments.find((a) => a.id === id);

    if (canceledAppt) {
      try {
        addNotification({
          doctorId: canceledAppt.doctorId,
          type: "cancel",
          message: `❌ Appointment canceled by ${user?.fullName || canceledAppt.patientName} at ${canceledAppt.time} on ${canceledAppt.date}.`,
        });
      } catch (err) {
        console.error("❌ Failed to send cancel notification:", err);
      }
    }

    const updatedAppointments = appointments.filter((a) => a.id !== id);
    setAppointments(updatedAppointments);
    setMessage("Appointment canceled successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const myAppointments = appointments || [];

  return (
    <div className={`my-appointments-page ${fadeClass}`}>
      <Container className="mt-5">
        <h3 className="text-primary mb-4">My Appointment Schedule 🩺</h3>
        {message && <Alert variant="success">{message}</Alert>}
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
                  <td className="text-center">
                    <Button variant="outline-danger" size="sm" onClick={() => handleCancel(a.id)}>Cancel</Button>
                  </td>
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
