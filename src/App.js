import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from "./Components/ScrollToTop";
import HomePage from './Page/HomePage';
import Header from './Components/Header';
import Login from './Page/Login';
import Register from './Page/Register';
import { AuthProvider } from './Context/Context';
import { AppointmentProvider } from "./Context/AppointmentContext";
import { NotificationProvider } from "./Context/NotificationContext";
import DoctorDashboard from "./Page/Doctor/DoctorDashboard";
import DoctorProfile from './Page/Doctor/DoctorProfile';
import DoctorAppointments from './Page/Doctor/DoctorAppointment';
import DoctorNotifications from './Page/Doctor/DoctorNotifications';
import AllDoctorsPage from "./Page/AllDoctorsPage";
import DoctorDetailPage from "./Page/DoctorDetailPage";
import ConfirmAppointmentPage from "./Page/ConfirmAppointmentPage";
import MyAppointments from './Page/MyAppointmentSchedule';
import PatientProfile from './Page/PatientProfile';  
import SpecialtyDoctors from "./Page/SpecialtyDoctors"; 
import SpecialtySection from './Components/SpecialtySection';
import NewsPage from './Page/NewsPage';
import NewsDetailPage from './Page/NewsDetailPage';
import Footer from './Components/Footer';
import AboutUs from './Page/AboutUs';
import Contacts from './Page/Contacts';
import WhyUs from './Page/WhyUs';
import DoctorsIntro from './Page/DoctorIntro';
import AdvicePage from './Page/AdvicePage';
function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppointmentProvider>
          <div className="App">
            <Header/>
            <main>
              <div className="container">
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/doctor/dashboard" element={<DoctorDashboard/>}/>
                  <Route path="/doctor/profile" element={<DoctorProfile/>}/>
                  <Route path="/doctor/appointments" element={<DoctorAppointments/>}/>
                  <Route path="/doctor/notifications" element={<DoctorNotifications/>} />
                  <Route path="/doctors" element={<AllDoctorsPage />} />
                  <Route path="/doctor/:id" element={<DoctorDetailPage />} />
                  <Route path="/confirm-appointment" element={<ConfirmAppointmentPage />} />
                  <Route path="/patient/profile" element={<PatientProfile />} />
                  <Route path="/patient/appointments" element={<MyAppointments />} />
                  <Route path="/specialties" element={<SpecialtySection />} />
                  <Route path="/specialty/:id" element={<SpecialtyDoctors />} />
                  <Route path="/articles" element={<NewsPage />} />
                  <Route path="/news/:id" element={<NewsDetailPage />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<Contacts/>} />
                  <Route path="/why-us" element={<WhyUs/>} />
                  <Route path="/doctorintro" element={<DoctorsIntro/>} />
                  <Route path="/advicepage" element={<AdvicePage/>} />
                </Routes>
              </div>
            </main>
            <Footer/>
          </div>
        </AppointmentProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
export default App;
