import React, { createContext, useState, useEffect, useContext } from "react";
import NotificationContext from "./NotificationContext";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const stored = localStorage.getItem("appointments");
    return stored ? JSON.parse(stored) : [];
  });

  const { addNotification } = useContext(NotificationContext);

  // Đồng bộ dữ liệu với localStorage
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // đồng bộ khi có thay đổi từ tab bệnh nhân 
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "appointments") {
        const updated = e.newValue ? JSON.parse(e.newValue) : [];
        setAppointments(updated);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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

    // thông báo cho bác sĩ khi có lịch mới
    try {
      addNotification({
        doctorId: appointment.doctorId,
        type: "booking",
        message: `🩺 New appointment from ${appointment.patientName} at ${appointment.time} on ${appointment.date}.`,
      });
      console.log("Notification sent to doctor:", appointment.doctorId);
    } catch (error) {
      console.error("Notification failed:", error);
    }
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
        setAppointments,
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
