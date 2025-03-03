import React from "react";
import { ListGroup, Alert, Card, Row, Col, Button } from "react-bootstrap";
import { FaInfoCircle, FaTrash } from "react-icons/fa";

function ExpiredItems({ inventory, setInventory }) {
  // Check for expired items
  const checkExpiry = () => {
    const today = new Date();
    const expiredItems = inventory.filter(item => new Date(item.expiryDate) < today);
    return expiredItems;
  };

  const deleteItem = (itemId) => {
    // Filter out the item with the matching ID
    const updatedInventory = inventory.filter((item) => item.id !== itemId);

    // Update the inventory state
    setInventory(updatedInventory);
  };

  return (
    <div
    style={{   minHeight: "100vh",
        flex:1,backgroundColor: "#f8d7da", // Light yellow background
     }}
    >

    <Row className="mb-4">
      <Col>
        <Card
          style={{
            border: "none",
            borderRadius: "10px",
            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8d7da", // Light red background
          }}
        >
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#721c24", // Dark red for contrast
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent:'center'
              }}
            >
              Expired Items
            </Card.Title>

            {checkExpiry().length > 0 ? (
              <ListGroup>
                {checkExpiry().map((item, index) => (
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
                    <Row className="align-items-center">
                      <Col>
                        <h6
                          style={{
                            color: "#721c24", // Dark red for item name
                            fontWeight: "bold",
                            marginBottom: "0",
                            fontSize: "16px",
                          }}
                        >
                          {item.itemName}
                        </h6>
                        <p
                          style={{
                            color: "#856404", // Dark yellow for expiry date
                            marginBottom: "0",
                            fontSize: "14px",
                            paddingTop: "8px",
                          }}
                        >
                          Expired on {item.expiryDate}
                        </p>
                      </Col>
                      <Col xs="auto">
                        {/* Delete Button */}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteItem(item.id)} // Call deleteItem with the item's id
                        >
                          <FaTrash /> Delete
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Alert
                variant="success"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#d4edda", // Light green for success
                  color: "#155724", // Dark green for text
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FaInfoCircle size={20} /> No expired items.
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </div>

  );
}

export default ExpiredItems;