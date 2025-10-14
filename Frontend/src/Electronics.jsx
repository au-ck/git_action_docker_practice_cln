import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "./config.js";

const Electronics = () => {
  const [electronics, setElectronics] = useState([]);
  const [item, setItem] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: ""
  });
  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedItem, setFetchedItem] = useState(null);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const baseUrl = config.url;

  useEffect(() => {
    fetchAllItems();
  }, []);

  // Fetch all items
  const fetchAllItems = async () => {
    try {
      const res = await axios.get(baseUrl);
      setElectronics(res.data);
    } catch (error) {
      setMessage("Failed to fetch Electronics.");
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  // Validate form before submit
  const validateForm = () => {
    for (let key in item) {
      if (!item[key] || item[key].toString().trim() === "") {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  // Add new item
  const addItem = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(baseUrl, item); // ID auto-generated
      setMessage("Electronic item added successfully.");
      fetchAllItems();
      resetForm();
    } catch (error) {
      setMessage("Error adding item.");
    }
  };

  // Update existing item
  const updateItem = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/${editId}`, item);
      setMessage("Electronic item updated successfully.");
      fetchAllItems();
      resetForm();
    } catch (error) {
      setMessage("Error updating item.");
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setMessage("Item deleted successfully.");
      fetchAllItems();
    } catch (error) {
      setMessage("Error deleting item.");
    }
  };

  // Fetch item by ID
  const getItemById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/${idToFetch}`);
      setFetchedItem(res.data);
      setMessage("");
    } catch (error) {
      setFetchedItem(null);
      setMessage("Item not found.");
    }
  };

  // Edit item
  const handleEdit = (it) => {
    setItem({
      name: it.name,
      brand: it.brand,
      price: it.price,
      quantity: it.quantity
    });
    setEditId(it.id);
    setEditMode(true);
    setMessage(`Editing item with ID ${it.id}`);
  };

  // Reset form
  const resetForm = () => {
    setItem({
      name: "",
      brand: "",
      price: "",
      quantity: ""
    });
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="container mt-4">
      {/* Alert Messages */}
      {message && (
        <div
          className={`alert ${
            message.toLowerCase().includes("error") ||
            message.toLowerCase().includes("fail") ||
            message.toLowerCase().includes("not found")
              ? "alert-danger"
              : "alert-success"
          }`}
        >
          {message}
        </div>
      )}

      <h2 className="mb-3 text-primary">Electronics Management</h2>

      {/* Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <h4>{editMode ? "Edit Electronic Item" : "Add Electronic Item"}</h4>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control"
              value={item.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              className="form-control"
              value={item.brand}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="form-control"
              value={item.price}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              className="form-control"
              value={item.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3">
          {!editMode ? (
            <button className="btn btn-primary me-2" onClick={addItem}>
              Add Item
            </button>
          ) : (
            <>
              <button className="btn btn-success me-2" onClick={updateItem}>
                Update Item
              </button>
              <button className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Fetch by ID */}
      <div className="card p-3 mb-4 shadow-sm">
        <h4>Get Item By ID</h4>
        <div className="d-flex">
          <input
            type="number"
            value={idToFetch}
            onChange={(e) => setIdToFetch(e.target.value)}
            className="form-control me-2"
            placeholder="Enter ID"
          />
          <button className="btn btn-info text-white" onClick={getItemById}>
            Fetch
          </button>
        </div>

        {fetchedItem && (
          <div className="mt-3">
            <h5>Item Found:</h5>
            <pre>{JSON.stringify(fetchedItem, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All Items */}
      <div className="card p-3 shadow-sm">
        <h4>All Electronics</h4>
        {electronics.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered mt-2">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {electronics.map((it) => (
                  <tr key={it.id}>
                    <td>{it.id}</td>
                    <td>{it.name}</td>
                    <td>{it.brand}</td>
                    <td>{it.price}</td>
                    <td>{it.quantity}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(it)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteItem(it.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Electronics;