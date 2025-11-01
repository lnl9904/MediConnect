import './App.css';
import { Routes, Route, createRoutesFromElements } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './Page/HomePage';
import AdminDashboard from './Components/AdminDashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import Header from './Components/Header';
import Login from './Page/Login';
import Register from './Page/Register';
import Footer from './Components/Footer';
import { AuthProvider } from './Context/Context';
import { AppointmentProvider } from './Context/AppointmentContext';
import Dashboard from './admin/Dashboard';
import CityManager from './admin/CityManager';
import DoctorManager from './admin/DoctorManager';
import PatientManager from './admin/PatientManager';
import UserManager from './admin/UserManager';
import ContentManager from './admin/ContentManager';
import initMockData from './utils/initMockData';

// Doctor pages
import DoctorDashboard from "./Page/Doctor/DoctorDashboard";
import DoctorProfile from './Page/Doctor/DoctorProfile';
import DoctorAppointments from './Page/Doctor/DoctorAppointment';
import DoctorNotifications from './Page/Doctor/DoctorNotifications';

// Public pages
import AllDoctorsPage from "./Page/AllDoctorsPage";
import DoctorDetailPage from "./Page/DoctorDetailPage";
import ConfirmAppointmentPage from "./Page/ConfirmAppointmentPage";
import SpecialtyDetailPage from "./Page/SpecialtyDetailPage";

function App() {
  useEffect(() => {
    initMockData();
  }, []);
  return (
    <AuthProvider>
      <AppointmentProvider>
        <div className="App">
          <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Header />
              <main>
                <div className="container">
                  <HomePage />
                </div>
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/login" element={
            <>
              <Header />
              <main>
                <div className="container">
                  <Login />
                </div>
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/register" element={
            <>
              <Header />
              <main>
                <div className="container">
                  <Register />
                </div>
              </main>
              <Footer />
            </>
          } />

          {/* Doctor routes */}
          <Route element={<ProtectedRoute requiredRoles={["doctor"]} />}>
            <Route path="/doctor/dashboard" element={
              <>
                <Header />
                <main>
                  <div className="container">
                    <DoctorDashboard />
                  </div>
                </main>
                <Footer />
              </>
            } />
            <Route path="/doctor/profile" element={
              <>
                <Header />
                <main>
                  <div className="container">
                    <DoctorProfile />
                  </div>
                </main>
                <Footer />
              </>
            } />
            <Route path="/doctor/appointments" element={
              <>
                <Header />
                <main>
                  <div className="container">
                    <DoctorAppointments />
                  </div>
                </main>
                <Footer />
              </>
            } />
            <Route path="/doctor/notifications" element={
              <>
                <Header />
                <main>
                  <div className="container">
                    <DoctorNotifications />
                  </div>
                </main>
                <Footer />
              </>
            } />
          </Route>

          {/* Public routes for viewing doctors and appointments */}
          <Route path="/doctors" element={
            <>
              <Header />
              <main>
                <div className="container">
                  <AllDoctorsPage />
                </div>
              </main>
              <Footer />
            </>
          } />
          <Route path="/doctor/:id" element={
            <>
              <Header />
              <main>
                <div className="container">
                  <DoctorDetailPage />
                </div>
              </main>
              <Footer />
            </>
          } />
          <Route path="/confirm-appointment" element={
            <>
              <Header />
              <main>
                <div className="container">
                  <ConfirmAppointmentPage />
                </div>
              </main>
              <Footer />
            </>
          } />
          <Route path="/specialty/:id" element={
            <>
              <Header />
              <main>
                <div className="container">
                  <SpecialtyDetailPage />
                </div>
              </main>
              <Footer />
            </>
          } />

          {/* Admin routes */}
          <Route element={<ProtectedRoute requiredRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="cities" element={<CityManager />} />
              <Route path="doctors" element={<DoctorManager />} />
              <Route path="patients" element={<PatientManager />} />
              <Route path="users" element={<UserManager />} />
              <Route path="content" element={<ContentManager />} />
            </Route>
          </Route>
        </Routes>
        </div>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
