// src/pages/ConfirmAppointmentPage.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * ConfirmAppointmentPage
 * - Hiển thị thông tin bác sĩ
 * - Form thông tin bệnh nhân + thanh toán (giả lập)
 * - Date of Birth cập nhật số ngày đúng theo tháng/năm
 * - Card Expiry tự động định dạng MM/YY
 */
export default function ConfirmAppointmentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, selectedDate, selectedTime } = location.state || {};

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    receiptEmail: "",
    cardNumber: "",
    cardExpiry: "",
  });

  const [errors, setErrors] = useState({});
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // Năm sinh khả dụng (từ hiện tại lùi về 120 năm)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Cập nhật số ngày theo tháng & năm
  useEffect(() => {
    const m = parseInt(form.month, 10);
    const y = parseInt(form.year, 10);
    if (m && y) {
      const days = new Date(y, m, 0).getDate();
      const arr = Array.from({ length: days }, (_, i) => i + 1);
      setDaysInMonth(arr);
      if (form.day && parseInt(form.day, 10) > days) {
        setForm((prev) => ({ ...prev, day: "" }));
      }
    } else {
      setDaysInMonth([]);
    }
  }, [form.month, form.year]);

  // Hàm định dạng ngày hết hạn (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // chỉ giữ số
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setForm((prev) => ({ ...prev, cardExpiry: value.slice(0, 5) }));
  };

  // Validate dữ liệu form
  const validate = () => {
    const e = {};
    if (!form.firstName || form.firstName.trim().length < 2)
      e.firstName = "Please enter at least 2 characters.";
    if (!form.lastName || form.lastName.trim().length < 2)
      e.lastName = "Please enter at least 2 characters.";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (form.email !== form.confirmEmail)
      e.confirmEmail = "Emails do not match.";
    if (!form.phone || form.phone.trim().length < 9)
      e.phone = "Please enter a valid phone number.";
    if (!(form.day && form.month && form.year))
      e.dob = "Please select your full date of birth.";
    if (!form.gender)
      e.gender = "Please select gender.";
    if (!form.cardNumber || form.cardNumber.replace(/\s+/g, "").length < 8)
      e.cardNumber = "Invalid card number.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry))
      e.cardExpiry = "Enter expiry in MM/YY format.";
    if (form.receiptEmail && !/^\S+@\S+\.\S+$/.test(form.receiptEmail))
      e.receiptEmail = "Please enter a valid receipt email.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      if (name === "month" || name === "year") delete copy["dob"];
      return copy;
    });
  };

  // Giả lập thanh toán
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      const firstKey = Object.keys(validation)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsProcessing(true);
    setErrors({});
    try {
      await new Promise((res) => setTimeout(res, 1800)); // giả lập delay API
      setIsProcessing(false);
      setIsPaid(true);
    } catch (err) {
      setIsProcessing(false);
      setErrors({ submit: "Payment failed. Please try again." });
    }
  };

  if (!doctor) {
    return (
      <div className="container my-5 text-center">
        <h4>No appointment details found.</h4>
        <button className="btn btn-outline-primary mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 760 }}>
        <h3 className="text-center text-primary mb-4">Confirm Appointment</h3>

        {/* Appointment Summary */}
        <div className="mb-4">
          <p><strong>Doctor:</strong> {doctor.name}</p>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          <p><strong>Hospital:</strong> {doctor.hospital}</p>
          <p><strong>Date:</strong> {selectedDate}</p>
          <p><strong>Time:</strong> {selectedTime}</p>
          <p><strong>Consultation Fee:</strong> 100$</p>
        </div>

        {!isPaid ? (
          <form onSubmit={handleSubmit} noValidate>
            {/* Tên */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Email</label>
              <input
                name="confirmEmail"
                type="email"
                value={form.confirmEmail}
                onChange={handleChange}
                className={`form-control ${errors.confirmEmail ? "is-invalid" : ""}`}
              />
              {errors.confirmEmail && <div className="invalid-feedback">{errors.confirmEmail}</div>}
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            {/* DOB */}
            <div className="mb-3">
              <label className="form-label">Date Of Birth (Day / Month / Year)</label>
              <div className="d-flex justify-content-center gap-2">
                <select
                  name="day"
                  value={form.day}
                  onChange={handleChange}
                  className={`form-select ${errors.dob ? "is-invalid" : ""}`}
                  style={{ width: 120 }}
                >
                  <option value="">Day</option>
                  {daysInMonth.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select
                  name="month"
                  value={form.month}
                  onChange={handleChange}
                  className="form-select"
                  style={{ minWidth: 160 }}
                >
                  <option value="">Month</option>
                  {months.map((m, idx) => (
                    <option key={idx} value={idx + 1}>{m}</option>
                  ))}
                </select>
                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="form-select"
                  style={{ width: 140 }}
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              {errors.dob && <div className="text-danger small mt-1 text-center">{errors.dob}</div>}
            </div>

            {/* Gender */}
            <div className="mb-3 text-center">
              <label className="form-label me-2">Gender:</label>
              <div className="form-check form-check-inline">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="male"
                  checked={form.gender === "male"}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="male" className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="female"
                  checked={form.gender === "female"}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="female" className="form-check-label">Female</label>
              </div>
              {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
            </div>

            {/* Receipt Email */}
            <div className="mb-3">
              <label className="form-label">Email for Receipt</label>
              <input
                name="receiptEmail"
                type="email"
                value={form.receiptEmail}
                onChange={handleChange}
                className={`form-control ${errors.receiptEmail ? "is-invalid" : ""}`}
              />
              {errors.receiptEmail && <div className="invalid-feedback">{errors.receiptEmail}</div>}
            </div>

            {/* Card info */}
            <div className="mb-3">
              <label className="form-label">Card Info</label>
              <div className="d-flex gap-2">
                <input
                  name="cardNumber"
                  type="text"
                  placeholder="Card number"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
                />
                <input
                  name="cardExpiry"
                  type="text"
                  placeholder="MM / YY"
                  value={form.cardExpiry}
                  onChange={handleExpiryChange}
                  className={`form-control ${errors.cardExpiry ? "is-invalid" : ""}`}
                  style={{ width: 120 }}
                  maxLength="5"
                />
              </div>
              {errors.cardNumber && <div className="invalid-feedback d-block">{errors.cardNumber}</div>}
              {errors.cardExpiry && <div className="invalid-feedback d-block">{errors.cardExpiry}</div>}
            </div>

            {/* Error + Submit */}
            {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
            <div className="d-flex gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-success flex-grow-1"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" /> Processing...
                  </>
                ) : (
                  "Make Payment 100$"
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
                disabled={isProcessing}
              >
                Back
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="alert alert-success">
              <h5>Appointment successfully booked!</h5>
            </div>
            <p>
              Thank you — a receipt has been sent
              {form.receiptEmail ? ` to ${form.receiptEmail}` : ""}.
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Back to Home
              </button>
              <button className="btn btn-outline-secondary" onClick={() => window.print()}>
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
