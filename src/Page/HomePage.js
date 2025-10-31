import React, { useState } from "react";
import "../index.css";
import "./Page.css";
import BookingDoctorSection from "../Components/BookingDoctorSection";
import Banner from "../Components/Banner";
import SpecialtySection from "../Components/SpecialtySection";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [fadeClass, setFadeClass] = useState("fade-in");

  // Hàm điều hướng có hiệu ứng mượt khi rời trang
  const smoothNavigate = (path) => {
    setFadeClass("fade-out");
    setTimeout(() => navigate(path), 400);
  };

  return (
    <div className={`home-page ${fadeClass}`}>
      {/* Banner */}
      <Banner />

      {/* Phần Khám Chuyên Khoa */}
      <SpecialtySection />

      {/* Phần đặt lịch bác sĩ */}
      <section className="doctor-booking-section">
        <BookingDoctorSection navigate={smoothNavigate} />
      </section>
    </div>
  );
}

export default HomePage;
