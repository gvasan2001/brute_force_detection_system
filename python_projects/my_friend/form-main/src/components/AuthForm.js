import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const AuthPage = ({ children }) => {
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
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>{children}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthPage;
