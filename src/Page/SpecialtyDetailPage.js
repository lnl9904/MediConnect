import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";

const specialties = [
  { id: 1, name: "Orthopedics" },
  { id: 2, name: "Neurology" },
  { id: 3, name: "Gastroenterology" },
  { id: 4, name: "Cardiology" },
  { id: 5, name: "ENT (Ear, Nose, Throat)" },
  { id: 6, name: "Spine Care" },
];

const doctors = [
  { id: 1, name: "Dr. Alice Nguyen", specialty: "Spine Care", image: "https://randomuser.me/api/portraits/women/21.jpg" },
  { id: 2, name: "Dr. David Tran", specialty: "Cardiology", image: "https://randomuser.me/api/portraits/men/31.jpg" },
  { id: 3, name: "Dr. Emily Le", specialty: "Cardiology", image: "https://randomuser.me/api/portraits/women/32.jpg" },
  { id: 6, name: "Dr. John Bui", specialty: "Neurology", image: "https://randomuser.me/api/portraits/men/52.jpg" },
  { id: 10, name: "Dr. Michael Phan", specialty: "Spine Care", image: "https://randomuser.me/api/portraits/men/66.jpg" },
  { id: 26, name: "Dr. Jason Pham", specialty: "Orthopedics", image: "https://randomuser.me/api/portraits/men/73.jpg" },
  { id: 28, name: "Dr. Alex Le", specialty: "Orthopedics", image: "https://randomuser.me/api/portraits/men/75.jpg" },
  { id: 29, name: "Dr. Lily Nguyen", specialty: "Orthopedics", image: "https://randomuser.me/api/portraits/women/76.jpg" },
  { id: 27, name: "Dr. Emily Tran", specialty: "ENT (Ear, Nose, Throat)", image: "https://randomuser.me/api/portraits/women/74.jpg" },
  { id: 30, name: "Dr. Robert Vo", specialty: "ENT (Ear, Nose, Throat)", image: "https://randomuser.me/api/portraits/men/77.jpg" },
];

export default function SpecialtyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm chuyên khoa theo ID
  const specialty = specialties.find((s) => s.id === parseInt(id));
  if (!specialty) return <h2 className="text-center mt-5">Specialty not found</h2>;

  // Lọc bác sĩ theo tên chuyên khoa
  const doctorsBySpecialty = doctors.filter(
    (doc) => doc.specialty.toLowerCase() === specialty.name.toLowerCase()
  );

  return (
    <div className="container py-4">
      <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2 className="text-primary fw-bold mb-4 text-center">
        {specialty.name} Doctors
      </h2>

      {doctorsBySpecialty.length === 0 ? (
        <p className="text-center text-muted">No doctors found for this specialty.</p>
      ) : (
        <div className="doctor-grid">
          {doctorsBySpecialty.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img src={doctor.image} alt={doctor.name} />
              <h5>{doctor.name}</h5>
              <p>{doctor.specialty}</p>
              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate(`/doctor/${doctor.id}`)} 
                >
                Book Appointment
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
