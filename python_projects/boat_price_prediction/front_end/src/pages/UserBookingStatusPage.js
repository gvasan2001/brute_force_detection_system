
import React from "react";
import { Card, Table, Badge, Container } from "react-bootstrap";
import "./ViewBoatsPage.css"; 

const userBookings = [
  {
    id: 101,
    boat: "Sunshine",
    date: "2025-04-10",
    seats: ["A1", "A2"],
    status: "Confirmed",
    price: 1200,
  },
  {
    id: 102,
    boat: "Wave Rider",
    date: "2025-04-15",
    seats: ["B1"],
    status: "Pending",
    price: 600,
  },
  {
    id: 103,
    boat: "Ocean Bliss",
    date: "2025-04-20",
    seats: ["C3", "C4"],
    status: "Cancelled",
    price: 0,
  },
];

function getStatusBadge(status) {
  switch (status) {
    case "Confirmed":
      return <Badge bg="success">Confirmed</Badge>;
    case "Pending":
      return <Badge bg="warning" text="dark">Pending</Badge>;
    case "Cancelled":
      return <Badge bg="danger">Cancelled</Badge>;
    default:
      return <Badge bg="secondary">Unknown</Badge>;
  }
}

function UserBookingStatusPage() {
  return (
    <Container className="py-5">
      <Card className="custom-card shadow-lg border-0 rounded-4">
        <Card.Body>

          <h4 className="section-heading text-center mb-4">My Booking Status</h4>

          <div className="table-responsive">
            <Table striped bordered hover responsive className="custom-table text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Boat</th>
                  <th>Date</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userBookings.map((booking, idx) => (
                  <tr key={booking.id}>
                    <td>{idx + 1}</td>
                    <td>{booking.boat}</td>
                    <td>{booking.date}</td>
                    <td>{booking.seats.join(", ")}</td>
                    <td>₹{booking.price}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserBookingStatusPage;
