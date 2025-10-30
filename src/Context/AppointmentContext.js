import React, { createContext, useState, useEffect } from "react";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const stored = localStorage.getItem("appointments");
    return stored ? JSON.parse(stored) : [];
  });

  // Đồng bộ dữ liệu với localStorage
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Thêm lịch hẹn (chặn trùng)
  const addAppointment = (appointment) => {
    const isDuplicate = appointments.some(
      (a) =>
        a.doctorId === appointment.doctorId &&
        a.date === appointment.date &&
        a.time === appointment.time &&
        (a.patientEmail === appointment.patientEmail || a.userId === appointment.userId)
    );

    if (isDuplicate) {
      alert("⚠️ You already booked this time slot!");
      return;
    }

    const newAppt = {
      ...appointment,
      id: Date.now(),
      status: "Haven't examined yet",
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [...prev, newAppt]);
  };

  // Cập nhật trạng thái lịch hẹn
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  // Xóa lịch hẹn (nếu cần)
  const removeAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointmentStatus,
        removeAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
