import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<LoginScreen />} exact />
            <Route path="/home" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
