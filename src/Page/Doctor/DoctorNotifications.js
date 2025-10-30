import React, { useContext } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotificationContext from "../../Context/NotificationContext";
import AuthContext from "../../Context/Context"; 

export default function DoctorNotifications() {
  const { getDoctorNotifications, markAsRead } = useContext(NotificationContext);
  const { user } = useContext(AuthContext); // Lấy user từ context

  // Lấy ID thật từ user (khi login là bác sĩ)
  const doctorId = user?.doctorId;

  const notifications = getDoctorNotifications(doctorId) || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Notifications{" "}{unreadCount > 0 && <Badge bg="danger">{unreadCount}</Badge>}</h2>
        <Button as={Link} to="/doctor/dashboard" variant="secondary">← Back to Dashboard</Button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-muted">No notifications yet.</p>
        ) : (
        notifications.map((n) => (
          <Card key={n.id} className={`mb-3 shadow-sm ${n.read ? "bg-light" : "border-primary"}`}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <Card.Title>
                    {n.type === "booking" && "📅 New schedule"}
                    {n.type === "reschedule" && "🔄 Reschedule"}
                    {n.type === "cancel" && "❌ Cancel appointment"}
                  </Card.Title>
                  <Card.Text>{n.message}</Card.Text>
                  <small className="text-muted">Date: {n.date}</small>
                </div>
                {!n.read && (
                  <Button variant="outline-primary" size="sm" onClick={() => markAsRead(n.id)}>Mark as Read</Button>
                )}
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}
