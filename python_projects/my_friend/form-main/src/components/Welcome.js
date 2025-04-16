import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Welcome = () => {
  const navigate = useNavigate(); // 👈 React Router navigation
  const [formData, setFormData] = useState({
    aadharNum: "",
    panNum: "",
    phoneNum: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Friend Form Submitted:", formData);
    toast.success("Request sent successfully!");

    // Redirect to loading page after slight delay to let toast show
    setTimeout(() => {
      navigate("/loading");
    }, 1000);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="p-4 shadow-lg" style={{ borderRadius: "10px" }}>
              <Card.Title className="text-center fw-bold fs-4 text-primary">
                Friend Request
              </Card.Title>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter PAN Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter PAN number"
                      name="panNum"
                      value={formData.panNum}
                      onChange={handleChange}
                      maxLength="10"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Enter Aadhar Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Aadhar number"
                      name="aadharNum"
                      value={formData.aadharNum}
                      onChange={handleChange}
                      maxLength="12"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Enter Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      name="phoneNum"
                      value={formData.phoneNum}
                      onChange={handleChange}
                      maxLength="10"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Send Request
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Welcome;
