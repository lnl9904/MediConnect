import React, { useState, useContext, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import AuthContext from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import doctorsData from "../../data/doctors.json";

export default function DoctorProfile() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        specialization: user?.specialization || "",
        degree: user?.degree || "",
        phone: user?.phone || "",
        address: user?.address || "",
    });
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        if (user?.email) {
            const foundDoctor = doctorsData.find(
                (doc) => doc.email.toLowerCase() === user.email.toLowerCase()
            );
            if (foundDoctor) {
                setProfile((prev) => ({
                    ...prev,
                    specialization: foundDoctor.specialty,
                    degree: foundDoctor.degree,
                }));
            }
        }
    }, [user]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };
    const handleSave = () => {
        setEditMode(false);
        alert("Thông tin đã được cập nhật!");
    };
    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-primary mb-0">Doctor Profile 🩺</h3>
                <Button variant="outline-secondary" onClick={() => navigate("/doctor/dashboard")}>
                ⬅ Back to Doctor Dashboard
                </Button>
            </div>
            <Card className="p-4 shadow">
                <Form>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name="fullName" value={profile.fullName} onChange={handleChange} disabled={!editMode}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={profile.email} onChange={handleChange} disabled={!editMode}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Specialization</Form.Label>
                                <Form.Control type="text" name="specialization" value={profile.specialization} onChange={handleChange} disabled={!editMode}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Degree</Form.Label>
                                <Form.Control type="text" name="degree" value={profile.degree} onChange={handleChange} disabled={!editMode}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" value={profile.phone} onChange={handleChange} disabled={!editMode}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" value={profile.address} onChange={handleChange} disabled={!editMode}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-center mt-4">
                        {!editMode ? (
                        <Button variant="primary" onClick={() => setEditMode(true)}>
                            Edit Profile
                        </Button>
                        ) : (
                        <>
                            <Button variant="success" className="me-2" onClick={handleSave}>Save</Button>
                            <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
                        </>
                        )}
                    </div>
                </Form>
            </Card>
        </Container>
    );
}
