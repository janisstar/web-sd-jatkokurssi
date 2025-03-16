import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultApi, Configuration } from "../api";
import { Container, Card, Form, Button } from "react-bootstrap";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const api = new DefaultApi(
    new Configuration({ basePath: "http://localhost:3000" })
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.loginPost({ username, password });
      const data = response.data as any;
      localStorage.setItem("user", JSON.stringify(data));
      navigate(`/user/${data.id}`);
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <Card.Body>
          <Card.Title className="mb-4 text-center">Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="me-2 flex-fill">
                Login
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="flex-fill"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
