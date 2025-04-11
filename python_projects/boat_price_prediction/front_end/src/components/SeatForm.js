import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaChair } from 'react-icons/fa';

function SeatForm() {
  const [formData, setFormData] = useState({
    boatName: '',
    seatNumbers: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { boatName, seatNumbers } = formData;

    if (!boatName || !seatNumbers) {
      toast.warning('Please fill in both fields.');
      return;
    }

    const seatList = seatNumbers
      .split(',')
      .map(seat => seat.trim().toUpperCase())
      .filter(seat => seat.length > 0);

    if (seatList.length === 0) {
      toast.error('Please enter valid seat numbers.');
      return;
    }

    console.log('Assigned Seats:', { boat: boatName, seats: seatList });
    toast.success(`Assigned ${seatList.length} seats to ${boatName}`);

    setFormData({ boatName: '', seatNumbers: '' });
  };

  return (
    <Card className="container mt-5 shadow-lg mt-4 border-0 rounded-4 p-3 bg-light bg-gradient">
      <Card.Body>
        <div className="text-center mb-4">
          <FaChair size={36} className="text-primary mb-2" />
          <h4 className="fw-bold text-dark">Assign Seats</h4>
          <p className="text-muted">Enter boat name and seat numbers</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">🚤 Boat Name</Form.Label>
            <Form.Control
              type="text"
              name="boatName"
              value={formData.boatName}
              onChange={handleChange}
              placeholder="e.g., Ocean Queen"
              className="rounded-pill px-4 py-2 border border-success-subtle"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">🎫 Seat Numbers (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="seatNumbers"
              value={formData.seatNumbers}
              onChange={handleChange}
              placeholder="e.g., A1, A2, B1"
              className="rounded-pill px-4 py-2 border border-success-subtle"
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              className="rounded-pill fw-semibold py-2"
            >
              ✅ Assign Seats
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SeatForm;
