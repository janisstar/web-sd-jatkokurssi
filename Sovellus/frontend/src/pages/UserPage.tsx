import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

const UserPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [user, setUser] = useState({ username: "" });

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data);
          setUsername(data.username);
        }
      })
      .catch(() => alert("User not found"));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    }

    let updatePayload: any = { username: username.trim() };

    if (
      oldPassword.trim() !== "" ||
      newPassword.trim() !== "" ||
      confirmNewPassword.trim() !== ""
    ) {
      if (
        oldPassword.trim() === "" ||
        newPassword.trim() === "" ||
        confirmNewPassword.trim() === ""
      ) {
        alert("Fill all fields for password update");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        alert("New password and confirmed password are not the same");
        return;
      }
      updatePayload = { ...updatePayload, oldPassword, newPassword };
    }

    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatePayload),
    });

    if (response.ok) {
      alert("Profile updated!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      alert("Error updating profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
      localStorage.removeItem("user");
      alert("Profile deleted");
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <Card.Body>
          <Card.Title className="mb-4">Profile: {user.username}</Card.Title>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <fieldset className="mb-3 border p-3">
              <legend className="w-auto px-2">
                Password update (if necessary)
              </legend>
              <Form.Group className="mb-3" controlId="formOldPassword">
                <Form.Label>Old password:</Form.Label>
                <Form.Control
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>New password:</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmNewPassword">
                <Form.Label>Confirm new password:</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </Form.Group>
            </fieldset>
            <Button variant="primary" type="submit" className="w-100">
              Update
            </Button>
          </Form>
          <Row className="mt-3">
            <Col>
              <Button variant="danger" onClick={handleDelete} className="w-100">
                Delete profile
              </Button>
            </Col>
            <Col>
              <Button variant="secondary" onClick={() => navigate("/")} className="w-100">
                Back
              </Button>
            </Col>
            <Col>
              <Button variant="warning" onClick={handleLogout} className="w-100">
                Logout
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserPage;
