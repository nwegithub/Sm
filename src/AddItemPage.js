import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddItemPage({ inventory, setInventory }) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState("");
  const [category, setCategory] = useState("Fruits");
  const [subCategory, setSubCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Load inventory from local storage on component mount
  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setInventory(savedInventory);
  }, [setInventory]);

  // Save inventory to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  // Function to get temperature recommendation based on category
  const getTemperatureRecommendation = (category) => {
    switch (category) {
      case "Fruits":
        return "3°C to 5°C";
      case "Vegetables":
        return "4°C to 7°C";
      case "Dairy":
        return "2°C to 4°C";
      case "Meat":
        return "-1°C to 2°C";
      case "Beverages":
        return "5°C to 7°C";
      case "Cans":
        return "Room Temperature";
      case "Jam":
        return "2°C to 4°C";
      default:
        return "No recommendation available";
    }
  };

  // Function to validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!itemName) newErrors.itemName = "Item name is required.";
    if (!expiryDate) newErrors.expiryDate = "Expiry date is required.";
    if (quantity <= 0) newErrors.quantity = "Quantity must be a positive number.";
    if (category === "Cans" && !subCategory) newErrors.subCategory = "Sub-category is required for Cans.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle adding a new item
  const handleAddItem = () => {
    if (!validateForm()) return;

    // Create a new item object with a unique ID
    const newItem = {
      id: Date.now(), // Use timestamp as a unique ID
      itemName,
      quantity: Number(quantity), // Ensure quantity is a number
      expiryDate,
      category,
      subCategory: category === "Cans" ? subCategory : null,
      temperature: getTemperatureRecommendation(category),
    };

    // Update the inventory state with the new item
    const updatedInventory = [...inventory, newItem];
    setInventory(updatedInventory);

    // Save the updated inventory to local storage
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));

    // Clear the form fields
    setItemName("");
    setQuantity(1);
    setExpiryDate("");
    setCategory("Fruits");
    setSubCategory("");

    // Close the modal
    setShowModal(false);

    // Navigate back to the home page
    navigate("/");
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #80deea)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container style={{ maxWidth: "500px" }}>
        <Card
          className="p-4 shadow-lg"
          style={{
            borderRadius: "15px",
            background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
          }}
        >
          <h1 className="text-center mb-4" style={{ color: "#343a40" }}>
            Add Item
          </h1>
          <Form>
            {/* Item Name Field */}
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
                isInvalid={!!errors.itemName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.itemName}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Quantity Field */}
            <Form.Group className="mb-3">
              <Form.Label>Quantity (grams)</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                placeholder="Enter quantity"
                isInvalid={!!errors.quantity}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Expiry Date Field */}
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                isInvalid={!!errors.expiryDate}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiryDate}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Category Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>Dairy</option>
                <option>Meat</option>
                <option>Beverages</option>
                <option>Cans</option>
                <option>Jam</option>
              </Form.Control>
            </Form.Group>

            {/* Sub-Category Dropdown (Visible only when Category is "Cans") */}
            {category === "Cans" && (
              <Form.Group className="mb-3">
                <Form.Label>Sub-Category</Form.Label>
                <Form.Control
                  as="select"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  isInvalid={!!errors.subCategory}
                  required
                >
                  <option>Canned Fruits</option>
                  <option>Canned Vegetables</option>
                  <option>Canned Meat</option>
                  <option>Canned Fish</option>
                  <option>Other Canned Items</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.subCategory}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Form>

          {/* Display Temperature Recommendation */}
          <Alert variant="info" className="mt-3">
            Temperature Recommendation: {getTemperatureRecommendation(category)}
          </Alert>

          {/* Add Item Button */}
          <Button
            onClick={() => setShowModal(true)}
            variant="primary"
            className="mt-3 w-100"
            style={{ background: "#80cbc4", border: "none", color: "#000000", }}
          >
            Add Item
          </Button>
        </Card>

        {/* Modal for Confirmation */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to add this item to your inventory?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
                  onClick={handleAddItem}
                  style={{
                    backgroundColor: "#80cbc4",
                    borderColor: "#80cbc4", 
                    color: "#000000", 
                
                  }}
            >
              Add Item
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default AddItemPage;