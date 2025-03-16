import React from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card>
            <Card.Body className="text-center">
              <Card.Title>User Manager</Card.Title>
              <Card.Text>Welcome! Please, login or register into the system, to continue.</Card.Text>
              <Button variant="primary" className="me-2" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="success" onClick={() => navigate('/register')}>
                Sign up
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
