import React, { useContext, useState } from "react";
import { Button, Card, ButtonGroup, ListGroup, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppointmentContext from "../../Context/AppointmentContext";

export default function DoctorAppointments() {
    const navigate = useNavigate();
    const { appointments, updateAppointmentStatus } = useContext(AppointmentContext);
    const [view, setView] = useState("day");
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);

    // Nhóm lịch hẹn theo ngày
    const groupedAppointments = appointments.reduce((acc, appt) => {
        if (!acc[appt.date]) acc[appt.date] = [];
        acc[appt.date].push(appt);
        return acc;
    }, {});

    const getFilteredAppointments = () => {
        if (view === "day") {
            return [{ date: selectedDate, list: groupedAppointments[selectedDate] || [] }];
        }
        return Object.keys(groupedAppointments).map((d) => ({
        date: d,
        list: groupedAppointments[d],
        }));
    };

    const filteredAppointments = getFilteredAppointments();

    // Hàm render màu trạng thái
    const renderStatusBadge = (status) => {
        switch (status) {
        case "Examined":
            return <Badge bg="success">{status}</Badge>;
        case "Canceled":
            return <Badge bg="danger">{status}</Badge>;
        default:
            return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="container mt-5">
            <Card className="p-4 shadow-sm">
                <Card.Title className="text-center text-primary mb-4 fs-3">Manage Examination Schedule</Card.Title>
                <div className="text-center mb-3">
                    <ButtonGroup>
                        <Button variant={view === "day" ? "primary" : "outline-primary"} onClick={() => setView("day")}>Day</Button>
                        <Button variant={view === "week" ? "primary" : "outline-primary"} onClick={() => setView("week")}>Week</Button>
                        <Button variant={view === "month" ? "primary" : "outline-primary"} onClick={() => setView("month")}>Month</Button>
                    </ButtonGroup>
                </div>
                <Form.Group className="mb-4 text-center">
                    <Form.Label className="fw-semibold">Select date</Form.Label>
                    <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ maxWidth: "250px", margin: "0 auto" }}/>
                </Form.Group>
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((day, i) => (
                        <div key={i} className="mb-3">
                            <h6 className="fw-bold text-primary">{day.date}</h6>
                            {day.list.length > 0 ? (
                                <ListGroup>
                                    {day.list.map((appt, idx) => (
                                        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                            <div>
                                                <strong>{appt.time}</strong> - {appt.patientName} <br />
                                                <small className="text-muted">{appt.reason || "No note"}</small>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                {renderStatusBadge(appt.status)}
                                                <Form.Select size="sm" style={{ width: "140px" }} value={appt.status} onChange={(e) => updateAppointmentStatus(appt.id, e.target.value)}>
                                                    <option>Haven't examined yet</option>
                                                    <option>Examined</option>
                                                    <option>Canceled</option>
                                                </Form.Select>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p className="text-muted ms-3">No appointments available.</p>
                            )}
                        </div>
                    ))
                ) : (
                <p className="text-center text-muted">No appointments for selected date.</p>
                )}
                <div className="text-center mt-4">
                    <Button variant="secondary" onClick={() => navigate("/doctor/dashboard")}>⬅ Back to Doctor Dashboard</Button>
                </div>
            </Card>
        </div>
    );
}
