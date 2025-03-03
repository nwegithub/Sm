import React from "react";
import { Container, ListGroup, Button, Alert } from "react-bootstrap";

function Remove({ inventory, setInventory }) {
  // Function to handle item removal
  const handleRemoveItem = (itemId) => {
    // Filter out the item with the matching ID
    const updatedInventory = inventory.filter((item) => item.id !== itemId);

    // Update the inventory state
    setInventory(updatedInventory);
  };

  return (
    <Container
      
    >
      <h1 className="text-center mb-4">Remove Item</h1>

      {/* Display a message if the inventory is empty */}
      {inventory.length === 0 ? (
        <Alert variant="info">No items in the inventory.</Alert>
      ) : (
        // Display the inventory list
        <ListGroup style={{
          background: "linear-gradient(135deg, rgb(234, 243, 245), rgb(64, 69, 70))",
          padding: "20px",
          borderRadius: "10px",
          paddingTop:50
     }}>
          {inventory.map((item) => (
            <ListGroup.Item
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <div style={{ flex: 1, marginRight: "10px" }}>
                <strong>{item.itemName}</strong> - {item.quantity}g (Expires: {item.expiryDate})
                <br />
                <small>Category: {item.category}</small>
                <br />
                <small>Temperature: {item.temperature}</small>
              </div>
              <Button
                variant="danger"
                size="sm"
                style={{ whiteSpace: "nowrap" }} // Prevent button text from wrapping
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default Remove;