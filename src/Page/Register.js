import { useState, useContext } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/Context";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const handleCancel = () => navigate("/");
    const handleSubmit = (e) => {
        e.preventDefault();
            const newUser = {
            name,
            email,
            password,
            role: "patient",
        };
        console.log("Đăng ký:", newUser);
        setSuccess(true); // bật thông báo thành công
        setTimeout(() => navigate("/login"), 2000); // chuyển sang login sau 2s
    };
    return (
        <Container className="mt-5" style={{ maxWidth: "450px" }}>
            <Card className="p-4 shadow register-card">
                <h3 className="text-center mb-4 text-primary">Register an account</h3>
                {success && (
                    <Alert variant="success" className="text-center">
                        Account registration successful, please wait a moment...
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button type="submit" variant="primary">Register</Button>
                        <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                </Form>
                <div className="text-center mt-3">
                    <small>
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary">Sign in</Link>
                    </small>
                </div>
            </Card>
        </Container>
    );
}
