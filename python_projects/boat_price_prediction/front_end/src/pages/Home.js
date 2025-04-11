
import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";
import boatImg from "../assets/header.png";

function Home() {
  return (
    <div className="home-hero-section d-flex align-items-center">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={6}>
            <h1 className="display-5 fw-bold text-light animate-fade-in">
              Welcome to Boat Booking App
            </h1>
            <p className="lead text-dark-50 mb-4">
              Explore the best boats, book your rides, and enjoy the waves in
              style.
            </p>
            <Link to="/booking">
              <Button variant="light" size="lg" className="fw-semibold">
                🚤 Explore Now
              </Button>
            </Link>
          </Col>
          <Col md={6} className="text-center mt-4 mt-md-0">
            <img
              src={boatImg}
              alt="3D Boat"
              className="img-fluid  boat-float"
              style={{ maxHeight: "450px" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
