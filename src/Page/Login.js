import { useState, useContext } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/Context";
import doctorsData from "../data/doctors.json"; // Import dữ liệu bác sĩ từ file JSON
 import patients from "../data/patients.json";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState(""); // State để lưu thông báo lỗi
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        //Nếu đăng nhập là bsi
        if (role === "doctor") {
        const foundDoctor = doctorsData.find(
            (doc) =>
            doc.name.toLowerCase() === fullName.trim().toLowerCase() &&
            doc.email.toLowerCase() === email.trim().toLowerCase() &&
            doc.password === password
        );

        if (!foundDoctor) {
            setError("Incorrect doctor account information.");
            return;
        }

        const doctorData = {
            id: foundDoctor.id,
            fullName: foundDoctor.name,
            email: foundDoctor.email,
            role: "doctor",
        };

        login(doctorData, "doctor");
        navigate("/doctor/dashboard");
        return;
    }

        //Nếu đăng nhập là bệnh nhân
        if (role === "patient") {
            const foundPatient = patients.find(
                (p) =>
                p.email.toLowerCase() === email.trim().toLowerCase() &&
                p.password === password
            );

            if (!foundPatient) {
                setError("Incorrect patient account information.");
                return;
            }

            const patientData = {
                id: foundPatient.id,
                firstName: foundPatient.firstName,
                lastName: foundPatient.lastName,
                fullName: foundPatient.fullName || `${foundPatient.firstName} ${foundPatient.lastName}`,
                email: foundPatient.email,
                phone: foundPatient.phone,
                gender: foundPatient.gender,
                dob: foundPatient.dob,
                role: "patient",
            };

            login(patientData, "patient");
            navigate("/");
            return;
        }

        //Admin (nếu có)
        if (role === "admin") {
            if (email === "admin@gmail.com" && password === "admin123") {
                const adminData = { fullName: "Admin", email, role: "admin" };
                login(adminData, "admin");
                navigate("/admin/dashboard");
            } else {
                setError("Incorrect admin credentials.");
            }
        }
    };
    return (
       <Container className="mt-5" style={{ maxWidth: "450px" }}>
            <Card className="p-4 shadow text-start">
                <h3 className="text-center mb-4 text-primary">Login</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                        </Form.Select>
                    </Form.Group>
                    {error && (<Alert variant="danger" className="text-center">{error}</Alert>)}
                    <div className="d-grid gap-2">
                        <Button type="submit" variant="primary">Login</Button>
                        <Button variant="secondary" onClick={() => navigate("/")}>Cancel</Button>
                    </div>
                </Form>
                <div className="text-center mt-3">
                    <small>Don't have an account yet?{" "}<Link to="/register" className="text-primary">Register now</Link></small>
                </div>
            </Card>
        </Container>
    );
}
