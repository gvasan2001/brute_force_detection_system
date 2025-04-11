import React, { useEffect, useState } from "react";
import { Table, Card, Container, Spinner } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../pages/ViewBoatsPage.css";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/view_booking');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading booking details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center text-danger">
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="custom-card shadow-lg border-0 rounded-4">
        <Card.Body>
          <h4 className="section-heading text-center mb-4">Booking Details</h4>
          <Table responsive hover className="custom-table align-middle text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>User</th>
                <th>Seats</th>
                <th>Day</th>
                <th>Date</th>
                <th>Boat</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking.id}>
                  <td>{idx + 1}</td>
                  <td>{booking.name}</td>
                  <td>{Array.isArray(booking.seats) ? booking.seats.join(", ") : booking.seats}</td>
                  <td>{booking.day}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.boatName}</td>
                  <td className="fw-bold text-success">₹{booking.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookingList;