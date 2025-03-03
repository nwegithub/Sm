import React from "react";
import { Card, ListGroup, Alert, Row, Col } from "react-bootstrap";
import { FaInfoCircle, FaShoppingCart } from "react-icons/fa";

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

function GroceryList({ inventory }) {
  // Generate grocery list (items with quantity < 200 grams)
  const generateGroceryList = () => {
    return inventory.filter(item => item.quantity < 200);
  };

  // Group items by category
  const groupedItems = generateGroceryList().reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <Row className="mb-4">
      <Col>
        <Card
          style={{
            border: "none",
            borderRadius: "10px",
            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent:'center',
                paddingBottom:20
              }}
            >
              <FaShoppingCart size={24} /> Grocery List
            </Card.Title>

            {Object.keys(groupedItems).length > 0 ? (
              <Row>
                {Object.entries(groupedItems).map(([category, items]) => (
                  <Col key={category} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card
                      style={{
                        border: "none",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: getCategoryColor(category), // Dynamic background color
                      }}
                    >
                      <Card.Body>
                        <h6
                          style={{
                            color: "#2c3e50",
                            fontWeight: "bold",
                            marginBottom: "16px",
                            fontSize: "18px",
                            textAlign: "center",
                          }}
                        >
                          {category}
                        </h6>
                        <ListGroup>
                          {items.map((item, index) => (
                            <ListGroup.Item
                              key={index}
                              style={{
                                border: "none",
                                borderRadius: "8px",
                                marginBottom: "10px",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#ffffff", // White background for items
                              }}
                            >
                              <h6
                                style={{
                                  color: "#2c3e50",
                                  fontWeight: "bold",
                                  marginBottom: "0",
                                  fontSize: "20px",
                                }}
                              >
                                {item.itemName}
                              </h6>
                              <p
                                style={{
                                  color: "#4a5568",
                                  marginBottom: "0",
                                  fontSize: "14px",
                                  paddingTop: "8px",
                                }}
                              >
                                {item.quantity} grams
                              </p>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Alert
                variant="success"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#d4edda",
                  color: "#155724",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FaInfoCircle size={20} /> No items need to be purchased!
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default GroceryList;