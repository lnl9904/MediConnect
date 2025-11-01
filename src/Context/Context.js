import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mockData from '../data/mockData.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Load auth state from localStorage on initial mount
        const savedUser = localStorage.getItem('user');
        const savedRole = localStorage.getItem('role');
        if (savedUser && savedRole) {
            setUser(JSON.parse(savedUser));
            setRole(savedRole);
            setIsLoggedIn(true);
        }
    }, []);

    // Save auth state to localStorage whenever it changes
    useEffect(() => {
        if (user && role) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('role', role);
        }
    }, [user, role]);

    const initializeMockData = () => {
        console.log('🔄 Initializing mock data...');
        localStorage.clear();
        Object.keys(mockData).forEach(key => {
            localStorage.setItem(key, JSON.stringify(mockData[key]));
        });
        console.log('✅ Mock data initialized');
    };

    const login = (email, password) => {
        try {
            // Ensure mock data is initialized
            if (!localStorage.getItem('data_initialized')) {
                initializeMockData();
                localStorage.setItem('data_initialized', 'true');
            }

            // Get fresh data from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
            const patients = JSON.parse(localStorage.getItem('patients')) || [];

            // Debug logs
            console.log('👤 Login attempt for:', email);
            console.log('📦 Available accounts:', {
                admins: users.map(u => ({ email: u.email, password: u.password })),
                doctors: doctors.map(d => ({ email: d.email, password: d.password })),
                patients: patients.map(p => ({ email: p.email, password: p.password }))
            });

            // Try to find user in all collections
            const adminUser = users.find(u => u.email === email);
            const doctorUser = doctors.find(d => d.email === email);
            const patientUser = patients.find(p => p.email === email);

            console.log('🔍 Found matches:', {
                admin: adminUser ? 'yes' : 'no',
                doctor: doctorUser ? 'yes' : 'no',
                patient: patientUser ? 'yes' : 'no'
            });

            // Verify credentials and set user state
            if (adminUser && adminUser.password === password) {
                console.log('✅ Admin login successful');
                setUser(adminUser);
                setRole('admin');
                setIsLoggedIn(true);
                return { success: true, user: { ...adminUser, role: 'admin' } };
            }

            if (doctorUser && doctorUser.password === password) {
                console.log('✅ Doctor login successful');
                setUser(doctorUser);
                setRole('doctor');
                setIsLoggedIn(true);
                return { success: true, user: { ...doctorUser, role: 'doctor' } };
            }

            if (patientUser && patientUser.password === password) {
                console.log('✅ Patient login successful');
                setUser(patientUser);
                setRole('patient');
                setIsLoggedIn(true);
                return { success: true, user: { ...patientUser, role: 'patient' } };
            }

            // If we get here, either email not found or password incorrect
            const userFound = adminUser || doctorUser || patientUser;
            console.log('❌ Login failed:', userFound ? 'Invalid password' : 'Email not found');
            return { 
                success: false, 
                error: userFound ? 'Invalid password' : 'Email not found'
            };

        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'An error occurred during login' };
        }
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, role, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

