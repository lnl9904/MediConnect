import { createContext, useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import patients from "../data/patients.json";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const login = (userData, userRole = "patient") => {
    if (!userData) return false;
      setUser(userData);
      setRole(userRole);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", userRole);
      return true;
    };

    const logout = () => {
      setUser(null);
      setRole(null);
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      navigate("/");
    };
    //Giữ đăng nhập sau khi reload
    useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setRole(savedRole || "patient");
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;

