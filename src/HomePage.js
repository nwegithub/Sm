import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FaBox, FaShoppingCart, FaExclamationTriangle, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  // Define the handleNavigate function
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container
      fluid // Use fluid to make the container full-width
      className="d-flex flex-column justify-content-end" // Align content to the bottom
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/sleek-smart-fridge-with-touchscreen-recipe-display-minimalist-gray-background_994764-220801.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Full viewport height
        padding: "50px",
        paddingVertical: 50
      }}
    >

      <Row className="mb-4">
        {/* Inventory Summary Card */}
        <Col md={3} style={{ backgroundColor: "#d4edda", padding: "10px", borderRadius: "15px" }}>
          <Card
            onClick={() => handleNavigate("/InventorySummary")}
            style={{ cursor: "pointer", borderRadius: "15px" }}
          >
            <Card.Body className="text-center">
              <FaBox size={50} className="mb-3" />
              <Card.Title>Inventory Summary</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        {/* Grocery List Card */}
        <Col md={3} style={{ backgroundColor: "#bbdb86", padding: "10px", borderRadius: "15px" }}>
          <Card
            onClick={() => handleNavigate("/GroceryList")}
            style={{ cursor: "pointer", borderRadius: "15px" }}
          >
            <Card.Body className="text-center">
              <FaShoppingCart size={50} className="mb-3" />
              <Card.Title>Grocery List</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} style={{ backgroundColor: "#f7d36f", padding: "10px", borderRadius: "15px" }}>
          <Card
            onClick={() => handleNavigate("/ItemsNearExpiry")}
            style={{ cursor: "pointer", borderRadius: "15px" }}
          >
            <Card.Body className="text-center">
              <FaClock size={50} className="mb-3" />
              <Card.Title>Items Near Expiry</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        {/* Expired Items Card */}
        <Col md={3} style={{ backgroundColor: "#ed747e", padding: "10px", borderRadius: "15px" }}>
          <Card
            onClick={() => handleNavigate("/ExpiredItems")}
            style={{ cursor: "pointer", borderRadius: "15px" }}
          >
            <Card.Body className="text-center">
              <FaExclamationTriangle size={50} className="mb-3" />
              <Card.Title>Expired Items</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        {/* Items Near Expiry Card */}
     
      </Row>
    </Container>
  );
}

export default HomePage;