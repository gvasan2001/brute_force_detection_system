import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import SectionHeader from '../components/SectionHeader';

function PredictionPage() {
  const [nextMonday, setNextMonday] = useState('');
  const [predictedPrice, setPredictedPrice] = useState('');
  const [availableSeats, setAvailableSeats] = useState(0);

  useEffect(() => {
    const today = moment();
    const monday = moment().day(8); // Next Monday
    setNextMonday(monday.format('dddd, MMMM Do YYYY'));

    // Mock prediction logic
    const price = 1000 + Math.floor(Math.random() * 200);
    const seats = 30 - Math.floor(Math.random() * 10);     

    setPredictedPrice(`₹${price}`);
    setAvailableSeats(seats);
  }, []);

  return (
    <Container className="py-4">
          <SectionHeader title="Next Week Prediction" />

      <Row>
        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <h6 className="text-muted">Prediction Day</h6>
              <h5 className="text-dark">{nextMonday}</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <h6 className="text-muted">Predicted Price</h6>
              <h5 className="text-success">{predictedPrice}</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <h6 className="text-muted">Available Seats</h6>
              <h5 className="text-info">{availableSeats}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PredictionPage;
