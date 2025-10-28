import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Storage keys for persisting auth state
const AUTH_STORAGE_KEY = "auth_state";

// Utils for managing persisted auth state
const loadAuth = () => {
    try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (err) {
        console.error('Error loading auth state:', err);
    }
    return { user: null, role: null };
};

const saveAuth = (user, role) => {
    try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, role }));
    } catch (err) {
        console.error('Error saving auth state:', err);
    }
};

const clearAuth = () => {
    try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
        console.error('Error clearing auth state:', err);
    }
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Initialize state from localStorage if available
    const { user: initialUser, role: initialRole } = loadAuth();
    const [user, setUser] = useState(initialUser);
    const [role, setRole] = useState(initialRole);
    const navigate = useNavigate();

    // Persist auth state changes to localStorage
    useEffect(() => {
        if (user && role) {
            saveAuth(user, role);
        } else {
            clearAuth();
        }
    }, [user, role]);

    const login = (userData, userRole) => {
        setUser(userData);
        setRole(userRole);
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContext;

