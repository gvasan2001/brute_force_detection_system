import React, { useState, useEffect } from "react";
import { Table, Button, Image, Card, Container, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ViewBoatsPage.css";

function ViewBoatsPage() {
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/view_boat');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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

 

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-danger">Error: {error}</div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="custom-card shadow-lg border-0 rounded-4">
        <Card.Body>
          <h4 className="section-heading text-center mb-4">Boats Management</h4>

          {boats.length === 0 ? (
            <div className="text-center py-4">
              <p>No boats found. Please add some boats.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table responsive hover className="custom-table align-middle text-center">
                <thead>
                  <tr>
                    <th>#</th>
                  
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Seats</th>
                    <th>Year</th>
                    <th>Reg. No</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {boats.map((boat, idx) => (
                    <tr key={boat.id}>
                      <td>{idx + 1}</td>
                     
                      <td>{boat.name}</td>
                      <td>{boat.type}</td>
                      <td className="text-muted small">{boat.description}</td>
                      <td>{boat.seatCount}</td>
                      <td>{boat.yearBuilt}</td>
                      <td>{boat.registerNumber}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ViewBoatsPage;