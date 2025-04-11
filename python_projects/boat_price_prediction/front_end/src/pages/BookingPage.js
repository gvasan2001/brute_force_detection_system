import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaShip } from 'react-icons/fa';

// Import images
import DefaultBoatImage from '../assets/header.png';
import BoatImage1 from '../assets/boat.jfif';
import BoatImage2 from '../assets/boat.jfif';

// Days of week for booking
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Price per seat for each day (in ₹)
const dayPrices = {
  'Sunday': 2500,
  'Monday': 2000,
  'Tuesday': 2000,
  'Wednesday': 2200,
  'Thursday': 2200,
  'Friday': 3000,
  'Saturday': 3500
};

// Map boat names to their images
const boatImages = {
  'Sunshine': BoatImage1,
  'Wave Rider': BoatImage2
};

function BookingCardView() {
  // State for storing boat data
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for booking modal
  const [showModal, setShowModal] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState(null);
  
  // State for form data
  const [formData, setFormData] = useState({
    userName: '',
    seats: 1,
    day: '',
    date: '',
    price: 0
  });

  // Fetch boats data when component loads
  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/user_view_boat');
        if (!response.ok) throw new Error('Failed to fetch boats');
        const data = await response.json();
        setBoats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBoats();
  }, []);

  // Get the correct image for a boat
  const getBoatImage = (boat) => {
    if (boatImages[boat.name]) return boatImages[boat.name];
    if (boat.image) return `../assets/${boat.image}`;
    return DefaultBoatImage;
  };

  // Open booking modal for a specific boat
  const handleShow = (boat) => {
    setSelectedBoat(boat);
    setShowModal(true);
    // Initialize form with default day (Sunday) and calculate initial price
    setFormData({
      userName: '',
      seats: 1,
      day: 'Sunday',
      date: '',
      price: dayPrices['Sunday'] * 1
    });
  };

  // Close booking modal
  const handleClose = () => {
    setShowModal(false);
    setFormData({ userName: '', seats: 1, day: '', date: '', price: 0 });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // Calculate new price whenever seats or day changes
      const newData = { ...prev, [name]: value };
      
      if (name === 'seats' || name === 'day') {
        const seats = name === 'seats' ? parseInt(value) || 1 : prev.seats;
        const day = name === 'day' ? value : prev.day;
        newData.price = dayPrices[day] * seats;
      }
      
      return newData;
    });
  };

  // Handle day selection (special handling for radio buttons)
  const handleDayChange = (day) => {
    setFormData(prev => ({
      ...prev,
      day,
      price: dayPrices[day] * prev.seats
    }));
  };

  // Submit booking to backend
  const handleBooking = async () => {
    // Validate all fields are filled
    if (!formData.userName || !formData.day || !formData.date) {
      toast.warning('Please fill all booking details.');
      return;
    }

    try {
      const bookingData = {
        ...formData,
        boatId: selectedBoat.id,
        boatName: selectedBoat.name
      };

      const response = await fetch('http://127.0.0.1:5000/user_booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) throw new Error('Booking failed');
      
      const result = await response.json();
      toast.success(`Booking confirmed! Reference: ${result.bookingId}`);
      handleClose();
    } catch (error) {
      toast.error(`Booking failed: ${error.message}`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading boats...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container py-4 text-center text-danger">
        <p>Error: {error}</p>
      </div>
    );
  }

  // No boats available
  if (boats.length === 0) {
    return (
      <div className="container py-4 text-center">
        <p>No boats available at the moment.</p>
      </div>
    );
  }

  // Main render
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">Available Boats</h2>
      
      <Row>
        {boats.map((boat, idx) => (
          <Col md={6} key={idx} className="mb-4">
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Img 
                variant="top" 
                src={getBoatImage(boat)} 
                className="rounded-top-4" 
                style={{ width: '100%', height: '300px', objectFit: 'cover' }} 
                alt={boat.name}
                onError={(e) => e.target.src = DefaultBoatImage}
              />
              
              <Card.Body>
                <Card.Title className="fw-bold text-primary">
                  <FaShip className="me-2" />
                  {boat.name}
                </Card.Title>
                <Card.Text><strong>Type:</strong> {boat.type}</Card.Text>
                <Card.Text><strong>Description:</strong> {boat.description}</Card.Text>
                <Card.Text><strong>Seats:</strong> {boat.seatCount}</Card.Text>
                <Card.Text><strong>Year Built:</strong> {boat.yearBuilt}</Card.Text>
                <Card.Text><strong>Reg No:</strong> {boat.registerNumber}</Card.Text>
                
                <Button 
                  className="rounded-pill w-100 fw-semibold" 
                  variant="primary" 
                  onClick={() => handleShow(boat)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book {selectedBoat?.name}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of Seats (Max: {selectedBoat?.seatCount})</Form.Label>
              <Form.Control
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                min="1"
                max={selectedBoat?.seatCount}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Day</Form.Label>
              <div>
                {days.map((day) => (
                  <Form.Check
                    key={day}
                    inline
                    label={`${day}`}
                    name="day"
                    type="radio"
                    id={`day-${day}`}
                    value={day}
                    checked={formData.day === day}
                    onChange={() => handleDayChange(day)}
                    required
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]} // Only future dates
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                type="text"
                value={`₹${formData.price}`}
                readOnly
                className="fw-bold"
              />
              <Form.Text className="text-muted">
                {formData.seats} seats × ₹{dayPrices[formData.day] || 0} = ₹{formData.price}
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingCardView;