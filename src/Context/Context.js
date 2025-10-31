import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const login = (userData, userRole) => {
        setUser(userData);
        setRole(userRole);
    };

    const logout = () => {
      setUser(null);
      setRole(null);
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      navigate("/");
    };
    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}
export default AuthContext;

