import React from "react";
import "../index.css";
import BookingDoctorSection from "../Components/BookingDoctorSection";
import Banner from "../Components/Banner";
import SpecialtySection from "../Components/SpecialtySection"; // ✅ thêm dòng này

function HomePage() {
  return (
    <>
      {/* Banner */}
      <Banner />

      {/* Phần Khám Chuyên Khoa */}
      <SpecialtySection />

      {/* Phần đặt lịch bác sĩ */}
      <section className="doctor-booking-section">
        <BookingDoctorSection />
      </section>
    </>
  );
}

export default HomePage;
