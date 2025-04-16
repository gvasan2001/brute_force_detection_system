import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const UploadDetailsForm = () => {
  const [formData, setFormData] = useState({
    aadharImg: null,
    panImg: null,
    photo: null,
    signature: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploaded Files:", formData);
    alert("Files uploaded successfully!");
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
  >  <Container className="d-flex justify-content-center align-items-center vh-100">
  <Card className="p-4 shadow w-50">
    <Card.Title  className="text-center fw-bold fs-4 text-primary">Welcome To My Friend</Card.Title>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Aadhar Image</Form.Label>
          <Form.Control type="file" name="aadharImg" accept="image/*" onChange={handleFileChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PAN Image</Form.Label>
          <Form.Control type="file" name="panImg" accept="image/*" onChange={handleFileChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Photo</Form.Label>
          <Form.Control type="file" name="photo" accept="image/*" onChange={handleFileChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Signature Photo</Form.Label>
          <Form.Control type="file" name="signature" accept="image/*" onChange={handleFileChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Send Request
        </Button>
      </Form>
    </Card.Body>
  </Card>
</Container></div>
   
  );
};

export default UploadDetailsForm;
