import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function HomePage() {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>
      {/* --- Hero / Banner --- */}
      <section
        aria-label="Hero Banner"
        style={{
          backgroundImage: "url('/img/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Overlay tối để chữ nổi bật */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.55))",
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(4px)",
            padding: "40px 50px",
            borderRadius: "14px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            maxWidth: 900,
          }}
        >
          <h1 className="fw-bold mb-3 display-5">
            Welcome to <span className="text-info">MediConnect</span>
          </h1>
          <p className="fs-5 mb-4">
            Comprehensive healthcare – Connecting doctors and patients easily
          </p>
          <Link
            to="/Doctors"
            className="btn btn-light btn-lg px-4 fw-semibold shadow-sm"
          >
            Schedule now
          </Link>
        </div>
      </section>

      {/* --- About MediConnect --- */}
      <section style={{ padding: "80px 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <img
                src="/img/about-banner.jpg"
                alt="About MediConnect"
                className="img-fluid rounded-4 shadow-sm"
                style={{
                  width: "100%",
                  maxHeight: "420px",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
              />
            </Col>
            <Col md={6}>
              <h2 className="text-primary fw-bold mb-3">About MediConnect</h2>
              <p className="text-muted fs-5">
               MediConnect is a digital healthcare platform that makes it easy for patients to book appointments,
visit online, and access high-quality healthcare services.
We aim for a convenient, safe, and modern healthcare experience.
              </p>
              <div className="mt-3">
                <Link
                  to="/about"
                  className="btn btn-outline-primary me-3 px-4 fw-semibold"
                >
                  Learn more
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-primary px-4 fw-semibold"
                >
                  Contact now
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- Medical Services --- */}
      <section style={{ backgroundColor: "#f9fbff", padding: "60px 0" }}>
        <Container>
          <h2 className="text-primary fw-bold text-center mb-4">
            Medical Services
          </h2>

          <Row className="g-4">
            {/* --- Theo chuyên khoa --- */}
            <Col md={6}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <h4 className="text-primary mb-3">According to specialty</h4>
                  <p className="text-muted mb-3">
                    Examination and treatment according to each specialized field of modern medicine
                  </p>
                  <ul className="list-unstyled">
                    {[
                      "General internal examination",
                      "Cardiovascular",
                      "Pediatrics",
                      "Obstetrics and gynecology",
                      "Dermatology",
                      "Eyes - Ears, Nose, and Throat",
                      "Musculoskeletal",
                      "Digestion – Liver and gallbladder",
                      "Neurology – Psychology",
                      "Oncology",
                    ].map((item, index) => (
                      <li key={index} className="py-2 px-3 rounded hover-service">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* --- Theo loại hình dịch vụ --- */}
            <Col md={6}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <h4 className="text-primary mb-3">By service type</h4>
                  <p className="text-muted mb-3">
                    Meet all flexible health care needs of patients
                  </p>
                  <ul className="list-unstyled">
                    {[
                      "Online examination (Video call, chat with doctor)",
                      "Make an appointment directly",
                      "Tests – Diagnostic imaging (blood, X-ray, MRI, CT, ultrasound...)",
                      "Home examination",
                      "Nutritional consulting",
                    ].map((item, index) => (
                      <li key={index} className="py-2 px-3 rounded hover-service">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- Meet Our Doctors --- */}
    <section style={{ padding: "70px 0" }}>
  <Container className="text-center">
    <h2 className="text-primary fw-bold mb-4">Meet Our Doctors</h2>
    <p className="text-muted mb-4">
      A team of experienced medical specialists are ready to serve you.
    </p>

    <div className="container">
      <div className="row g-4">
        {[
          {
            id: 1,
            specialtyId: 6,
            name: "Dr. Alice Nguyen",
            email: "doctor1@gmail.com",
            password: "12345",
            specialty: "Spine Care",
            hospital: "MediConnect",
            degree: "Doctor of Medicine (MD)",
            image: "https://randomuser.me/api/portraits/women/21.jpg",
          },
          {
            id: 2,
            specialtyId: 4,
            name: "Dr. David Tran",
            email: "doctor2@gmail.com",
            password: "12345",
            specialty: "Cardiology",
            hospital: "MediConnect",
            degree: "Doctor of Medicine (MD)",
            image: "https://randomuser.me/api/portraits/men/31.jpg",
          },
          {
            id: 3,
            specialtyId: 4,
            name: "Dr. Emily Le",
            email: "doctor3@gmail.com",
            password: "12345",
            specialty: "Cardiology",
            hospital: "MediConnect",
            degree: "Doctor of Medicine (MD)",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
          },
        ].map((doctor) => (
          <div className="col-md-4" key={doctor.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={doctor.image}
                className="card-img-top"
                alt={doctor.name}
              />
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text text-muted">{doctor.specialty}</p>
                <p className="card-text">
                  <strong>{doctor.hospital}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Container>
</section>


      {/* --- Custom CSS inline --- */}
      <style>
        {`
          .hover-service {
            transition: all 0.2s ease-in-out;
            cursor: pointer;
          }
          .hover-service:hover {
            background-color: #e7f1ff;
            color: #0056b3;
            transform: translateX(5px);
          }

          /* Hero responsive */
          @media (max-width: 768px) {
            section[aria-label="Hero Banner"] {
              height: 55vh;
              background-position: top;
            }
            section[aria-label="Hero Banner"] h1 {
              font-size: 1.8rem !important;
            }
            section[aria-label="Hero Banner"] p {
              font-size: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}
