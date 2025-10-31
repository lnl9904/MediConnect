// src/Page/SpecialtyDetailPage.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import doctors from "../data/doctors.json";
import "../index.css";

const specialties = [
  { id: 1, name: "Orthopedics" },
  { id: 2, name: "Neurology" },
  { id: 3, name: "Gastroenterology" },
  { id: 4, name: "Cardiology" },
  { id: 5, name: "ENT (Ear, Nose, Throat)" },
  { id: 6, name: "Spine Care" },
];

export default function SpecialtyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const specialty = specialties.find((s) => s.id === parseInt(id));
  if (!specialty) return <h2 className="text-center mt-5">Specialty not found</h2>;

  const doctorsBySpecialty = doctors.filter(
    (doc) => doc.specialty.toLowerCase() === specialty.name.toLowerCase()
  );

  return (
    <div className="container py-4">
      <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="text-primary fw-bold mb-4 text-center">{specialty.name} Doctors</h2>
      {doctorsBySpecialty.length === 0 ? (
        <p className="text-center text-muted">No doctors found for this specialty.</p>
        ) : (
        <div className="doctor-grid">
          {doctorsBySpecialty.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img src={doctor.image} alt={doctor.name} />
              <h5>{doctor.name}</h5>
              <p>{doctor.specialty}</p>
              <button className="btn btn-primary mt-2" onClick={() => navigate(`/doctor/${doctor.id}`)} >Book Appointment</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
