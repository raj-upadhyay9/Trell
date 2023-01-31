import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container style={{ paddingTop: "20vh" }}>
          <Routes>
            <Route path="/" element={<LoginScreen />} exact />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
