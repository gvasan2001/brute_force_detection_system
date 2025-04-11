import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShip, FaChair, FaClipboardList, FaUsers } from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
import "./AdminDashboard.css"; 

const adminOptions = [
  { title: "Manage Boats", icon: <FaShip size={36} />, route: "/admin/boats" },
  // { title: "Assign Seats", icon: <FaChair size={36} />, route: "/admin/seats" },
  { title: "View Bookings", icon: <FaClipboardList size={36} />, route: "/admin/bookings" },
  { title: "User Management", icon: <FaUsers size={36} />, route: "/admin/users" },
  { title: "View Boats", icon: <FaShip size={36} />, route: "/admin/view-boats" }

];

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <SectionHeader title="Admin Dashboard" />

      <Row xs={1} sm={2} md={2} lg={2} className="g-4">
        {adminOptions.map((opt, idx) => (
          <Col key={idx}>
            <Card
              className="text-center h-100 border-0 dashboard-card shadow-lg rounded-4"
              onClick={() => navigate(opt.route)}
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
            >
              <Card.Body className="py-4">
                <div className="text-primary mb-3 dashboard-icon">
                  {opt.icon}
                </div>
                <Card.Title className="fw-bold fs-5 text-dark">
                  {opt.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AdminDashboard;
