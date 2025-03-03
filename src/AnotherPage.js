import React from "react";
import { Container } from "react-bootstrap";

function AnotherPage() {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>
        Another Page
      </h1>
      <p className="text-center">This is another page in the application.</p>
    </Container>
  );
}

export default AnotherPage;