/** @format */

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const loginFetch = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:6969/authors/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resp = await response.json();
      if (resp.access) {
        localStorage.setItem("accessToken", resp.access);
        localStorage.setItem("refreshToken", resp.refresh);
        props.history.push("/home");
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12}>
          <h1>Login.</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form onSubmit={loginFetch}>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email Addresss"
                value={email}
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Form.Group>
            <Button variant="dark" className="w-100" type="submit">
              LOGIN
            </Button>
            <hr />
            <a href="http://localhost:6969/authors/googleLogin">
              {" "}
              <GoogleButton
                style={{ position: "absolute", left: "39%" }}
                type="dark" // can be light or dark
              />
            </a>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
