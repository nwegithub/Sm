import React from "react";
import { Card, ProgressBar, Row, Col } from "react-bootstrap";
import {
  FaAppleAlt,
  FaCarrot,
  FaCheese,
  FaDrumstickBite,
  FaCoffee,
  FaBox,
  FaCandyCane,
} from "react-icons/fa";

// Function to get the icon for each category
const getCategoryIcon = (category) => {
  switch (category) {
    case "Fruits":
      return <FaAppleAlt size={24} className="me-2" />;
    case "Vegetables":
      return <FaCarrot size={24} className="me-2" />;
    case "Dairy":
      return <FaCheese size={24} className="me-2" />;
    case "Meat":
      return <FaDrumstickBite size={24} className="me-2" />;
    case "Beverages":
      return <FaCoffee size={24} className="me-2" />;
    case "Cans":
      return <FaBox size={24} className="me-2" />;
    case "Jam":
      return <FaCandyCane size={24} className="me-2" />;
    default:
      return null;
  }
};

// Function to get the background color for each category
const getCategoryColor = (category) => {
  switch (category) {
    case "Fruits":
      return "#f8d7da"; // Light red
    case "Vegetables":
      return "#d4edda"; // Light green
    case "Dairy":
      return "#fff3cd"; // Light yellow
    case "Meat":
      return "#f5d9d9"; // Light pink
    case "Beverages":
      return "#d1ecf1"; // Light cyan
    case "Cans":
      return "#d6d8db"; // Light gray
    case "Jam":
      return "#f0e6f6"; // Light purple
    default:
      return "#ffffff"; // White
  }
};

function InventorySummary({ inventory }) {
  // Calculate the current total weight of the inventory
  const currentWeight = inventory.reduce((acc, item) => acc + Number(item.quantity), 0);
  const weightLimit = 40000; // Weight limit in grams

  return (
    <Row className="mb-4">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title className="text-center mb-4" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2c3e50" }}>
              Inventory Summary
            </Card.Title>

            {/* Total Items and Weight */}
            <Row className="mb-4">
              <Col>
                <div className="text-center">
                  <h5 style={{ color: "#4a5568" }}>
                    <strong>Total Items:</strong> {inventory.length}
                  </h5>
                  <h5 style={{ color: "#4a5568" }}>
                    <strong>Total Weight:</strong> {currentWeight / 1000} kg / {weightLimit / 1000} kg
                  </h5>
                </div>
              </Col>
            </Row>

            {/* Progress Bar */}
            <ProgressBar
              now={(currentWeight / weightLimit) * 100}
              label={`${((currentWeight / weightLimit) * 100).toFixed(1)}%`}
              variant="success"
              striped
              className="mb-4"
            />

            {/* Category Breakdown in Grid Layout
            <Card.Title className="text-center mb-3" style={{ fontSize: "1.25rem", color: "#2c3e50" }}>
              Category Breakdown
            </Card.Title> */}
            <Row>
              {inventory.map((item, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Card
                    style={{
                      backgroundColor: getCategoryColor(item.category),
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      borderRadius: "10px",
                    }}
                  >
                    <Card.Body className="text-center">
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        {getCategoryIcon(item.category)}
                      </div>
                      <h6 className="mb-2" style={{ color: "#2c3e50", fontWeight: "bold",fontSize:20 }}>
                        {item.itemName}
                      </h6>
                      <p className="mb-1" style={{ color: "#4a5568",fontSize: 16}}>
                        {item.quantity} grams
                      </p>
                      <p className="text-muted" style={{ color: "#718096",fontSize:12 }}>
                        {item.category}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default InventorySummary;