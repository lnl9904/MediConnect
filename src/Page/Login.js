import { useState, useContext } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/Context";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        
        try {
            // Debug logs
            console.log('🔐 Login attempt:', { email, password });
            
            // Get data from localStorage for validation
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
            const patients = JSON.parse(localStorage.getItem('patients')) || [];
            
            console.log('📊 Available accounts:', {
                admins: users.map(u => u.email),
                doctors: doctors.map(d => d.email),
                patients: patients.map(p => p.email)
            });
            
            const result = login(email, password);
            console.log('🎯 Login result:', result);
            
            if (result?.success) {
                console.log('✅ Login successful, user role:', result.user?.role);
                if (result.user?.role === 'admin') {
                    navigate('/admin');
                } else if (result.user?.role === 'doctor') {
                    navigate('/doctor/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                console.error('❌ Login failed:', result?.error);
                setError(result?.error || 'Invalid email or password');
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            setError('An unexpected error occurred');
        }
    };
    return (
        <Container className="mt-5" style={{ maxWidth: "450px" }}>
            <Card className="p-4 shadow text-start">
                <h3 className="text-center mb-4 text-primary">Login</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    {error && (
                        <Alert variant="danger" className="text-center">
                            {error}
                        </Alert>
                    )}
                    <div className="d-grid gap-2">
                        <Button type="submit" variant="primary">
                            Login
                        </Button>
                        <Button variant="secondary" onClick={() => navigate("/")}>
                            Cancel
                        </Button>
                    </div>
                </Form>
                <div className="text-center mt-3">
                    <small>
                        Don't have an account yet?{" "}
                        <Link to="/register" className="text-primary">Register now</Link>
                    </small>
                </div>
            </Card>
        </Container>
    );
}
