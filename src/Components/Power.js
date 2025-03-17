import React, { useState } from "react";
import axios from "axios";

const Power = () => {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePower = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/power", {
        base: parseFloat(base),
        exponent: parseFloat(exponent),
      });
      setResult(response.data.result);
    } catch (err) {
      console.error("Power calculation error:", err);
      setError("Failed to calculate power.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="operation-form">
      <h2>Power Calculation</h2>
      <input
        type="number"
        placeholder="Enter Base"
        value={base}
        onChange={(e) => setBase(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Exponent"
        value={exponent}
        onChange={(e) => setExponent(e.target.value)}
      />
      <button onClick={handlePower}>Calculate Power</button>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {result !== null && !loading && !error && <p>Result: {result}</p>}
    </div>
  );
};

export default Power;
