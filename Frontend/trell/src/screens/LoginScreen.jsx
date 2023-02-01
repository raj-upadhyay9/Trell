import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import dotenv from "dotenv";
import { useLocation, useNavigate } from "react-router-dom";

function LoginScreen() {
  dotenv.config();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/home";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, token } = userLogin;

  useEffect(() => {
    if (token) {
      history(redirect);
    }
  }, [history, token, redirect]);

  const submitHandler = (e) => {
    console.log(username, password);
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div style={{ marginTop: "20vh" }}>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Button type="submit" variant="primary">
              Sign In
            </Button>
            {loading && <Loader />}
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;
