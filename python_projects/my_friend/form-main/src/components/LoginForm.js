import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://gvasan.pythonanywhere.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response (status code 4xx or 5xx)
        toast.error(data.message || "Invalid credentials");
      } else {
        // Handle success response (status code 2xx)
        toast.success(data.message || "Login successful!");
        setTimeout(() => navigate("/welcome"), 1500);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      toast.error("An error occurred. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-4 shadow-lg rounded-lg" style={{ background: "#ffffffdd" }}>
      <Card.Title className="text-center text-primary fs-3 fw-bold">Login</Card.Title>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary fw-bold">
            Register
          </Link>
        </p>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;