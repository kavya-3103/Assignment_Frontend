import React, { useState, useEffect } from "react";

const OperationsList = () => {
  const [operations, setOperations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Fetch operations
  useEffect(() => {
    fetch("http://localhost:5000/api/calculations")
      .then((res) => res.json())
      .then((data) => setOperations(data))
      .catch((err) => console.error("Error fetching operations:", err));
  }, []);

  // Handle edit button click
  const handleEdit = (id, value) => {
    setEditId(id);
    setEditValue(value);
  };

  // Handle update operation
  const handleUpdate = async (id) => {
    try {
      const updatedValue = isNaN(editValue) ? editValue : Number(editValue); // Ensure it's a number
      const response = await fetch(`http://localhost:5000/api/operation/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: updatedValue }), // Update field
      });

      if (response.ok) {
        setOperations(
          operations.map((op) =>
            op.id === id ? { ...op, result: updatedValue } : op
          )
        );
        setEditId(null);
      } else {
        console.error("Failed to update operation");
      }
    } catch (error) {
      console.error("Error updating operation:", error);
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/operation/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOperations(operations.filter((op) => op.id !== id));
      } else {
        console.error("Failed to delete operation");
      }
    } catch (error) {
      console.error("Error deleting operation:", error);
    }
  };

  return (
    <div>
      <h2>Operations List</h2>
      <ul className="operation-list">
        {operations.map((op) => (
          <li key={op.id} className="operation-item">
            <strong>{op.operation}:</strong> {/* Show operation type */}
            {editId === op.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <span> {op.result} </span>
            )}

            {editId === op.id ? (
              <button className="operation-buttons" onClick={() => handleUpdate(op.id)}>Save</button>
            ) : (
              <button className="operation-buttons" onClick={() => handleEdit(op.id, op.result)}>Edit</button>
            )}

            <button className="operation-buttons" onClick={() => handleDelete(op.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OperationsList;
