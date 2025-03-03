import React from "react";
import { ListGroup, Alert, Card, Row, Col } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function ItemsNearExpiry({ inventory }) {
  // Check for items near expiry (within 3 days)
  const checkNearExpiry = () => {
    const today = new Date();
    const nearExpiryItems = inventory.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      const timeDiff = expiryDate - today;
      const daysLeft = timeDiff / (1000 * 60 * 60 * 24);
      return daysLeft > 0 && daysLeft <= 3;
    });
    return nearExpiryItems;
  };

  return (
    <div style={{   minHeight: "100vh",
       flex:1,backgroundColor: "#fff3cd", // Light yellow background
    }}>
    <Row className="mb-4" >
      <Col>
        <Card
          style={{
            border: "none",
            borderRadius: "10px",
            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff3cd", 
            flex:1,// Light yellow background
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
                justifyContent:'center'
              }}
            >
              Near expired item
            </Card.Title>

            {checkNearExpiry().length > 0 ? (
              <ListGroup>
                {checkNearExpiry().map((item, index) => (
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
                        fontSize: "16px",
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
                      Expiring Soon ({item.expiryDate})
                    </p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
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
                <FaInfoCircle size={20} /> No items nearing expiry.
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </div>
  );
}

export default ItemsNearExpiry;