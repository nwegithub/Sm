import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddItemPage from "./AddItemPage";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./HomePage";
import Remove from "./Remove";
import GroceryList from "./GroceryListScreen";
import InventorySummary from "./InventoryScreen";
import ExpiredItems from "./ExpiredScreen";
import ItemsNearExpiry from "./NearExpiredScreen";

// Define a constant for the local storage key
const LOCAL_STORAGE_KEY = "inventory";

function App() {
  // Initialize inventory state with saved value from local storage
  const [inventory, setInventory] = useState(() => {
    // Get saved inventory from local storage
    const savedInventory = localStorage.getItem(LOCAL_STORAGE_KEY);
    // Parse the saved inventory (or return an empty array if no data exists)
    return savedInventory ? JSON.parse(savedInventory) : [];
  });

  // Save inventory to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inventory));
  }, [inventory]);

  return (
    <Router>
      <Container fluid className="p-0">
        {/* Navigation Bar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Smart Kitchen Refrigerator</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/addItem">
                  Add Item
                </Nav.Link>
                <Nav.Link as={Link} to="/remove">
                  Remove Item
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Content */}
        <Routes>
          <Route
            path="/"
            element={<HomePage inventory={inventory} setInventory={setInventory} />}
          />
          <Route
            path="/addItem"
            element={<AddItemPage inventory={inventory} setInventory={setInventory} />}
          />
          <Route
            path="/remove"
            element={<Remove inventory={inventory} setInventory={setInventory} />}
          />
          <Route
            path="/remove"
            element={<Remove inventory={inventory} setInventory={setInventory} />}
          />   
          <Route
            path="/InventorySummary"
            element={<InventorySummary inventory={inventory} setInventory={setInventory} />}
          />   
          <Route
            path="/GroceryList"
            element={<GroceryList inventory={inventory} setInventory={setInventory} />}
          />   
          <Route
            path="/ExpiredItems"
            element={<ExpiredItems inventory={inventory} setInventory={setInventory} />}
          />
          <Route
            path="/ItemsNearExpiry"
            element={<ItemsNearExpiry inventory={inventory} setInventory={setInventory} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;