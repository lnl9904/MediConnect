import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const specialties = [
  { id: 1, name: "Orthopedics", icon: "https://cdn.bookingcare.vn/fo/w128/2023/12/26/101627-co-xuong-khop.png" },
  { id: 2, name: "Neurology", icon: "https://cdn.bookingcare.vn/fo/2023/12/26/101739-than-kinh.png" },
  { id: 3, name: "Gastroenterology", icon: "https://cdn.bookingcare.vn/fo/2023/12/26/101713-tieu-hoa.png" },
  { id: 4, name: "Cardiology", icon: "https://cdn.bookingcare.vn/fo/2023/12/26/101713-tim-mach.png" },
  { id: 5, name: "ENT (Ear, Nose, Throat)", icon: "https://cdn.bookingcare.vn/fo/2023/12/26/101713-tai-mui-hong.png" },
  { id: 6, name: "Spine Care", icon: "https://cdn.bookingcare.vn/fo/2023/12/26/101627-cot-song.png" },
];

function SpecialtySection() {
  const navigate = useNavigate();

  return (
    <section className="specialty-section">
      <div className="container">
        <h2 className="section-title text-primary fw-bold">
          Specialized Medical Departments
        </h2>
        <div className="specialty-grid">
          {specialties.map((item) => (
            <div
              key={item.id}
              className="specialty-item"
              onClick={() => navigate(`/specialty/${item.id}`)} // ✅ điều hướng
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpecialtySection;
