import React, { useContext } from "react";
import { Container, Table, Alert } from "react-bootstrap";
import AppointmentContext from "../Context/AppointmentContext";
import AuthContext from "../Context/Context";

export default function MyAppointments() {
  const { appointments } = useContext(AppointmentContext);
  const { user } = useContext(AuthContext);
  const myAppointments = appointments;

  return (
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
                <td>{a.patientName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
