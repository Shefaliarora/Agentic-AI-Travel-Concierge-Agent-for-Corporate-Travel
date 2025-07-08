import React, { useState } from 'react';
import axios from 'axios';

export default function BookingForm() {
  const [form, setForm] = useState({
    traveler: '',
    email: '',
    from: '',
    to: '',
    departure: '',
    returnDate: '',
    preferences: '',
    budget: ''
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const res = await axios.post(
        'https://blf88jji5a.execute-api.us-east-1.amazonaws.com/prod/booking-v2', // your API Gateway endpoint
        form
      );
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>🌍 Travel Booking Agent</h2>
      <form onSubmit={handleSubmit}>
      <input name="traveler" placeholder="Traveler Name" onChange={handleChange} required /><br />
      <input name="email" placeholder="Email Address" onChange={handleChange} required /><br />
        <input name="from" placeholder="From City" onChange={handleChange} required /><br />
        <input name="to" placeholder="To City" onChange={handleChange} required /><br />
        <input type="date" name="departure" onChange={handleChange} required /><br />
        <input type="date" name="returnDate" onChange={handleChange} required /><br />
        <input name="preferences" placeholder="Preferences (e.g. direct flight)" onChange={handleChange} /><br />
        <input name="budget" placeholder="Budget (₹)" onChange={handleChange} /><br />
        <button type="submit">Book Trip</button>
      </form>

      {response && !response.error && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          border: '2px solid #4CAF50',
          borderRadius: '10px',
          backgroundColor: '#f0fff4',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          <h3 style={{ color: '#2e7d32' }}>🎉 Trip Confirmed!</h3>
          <p><strong>Traveler:</strong> {response.traveler || "Guest"}</p>

          <h4>✈️ Flight Details</h4>
          <p><strong>Airline:</strong> {response.flight?.airline}</p>
          <p><strong>Flight #:</strong> {response.flight?.flight_number}</p>
          <p><strong>Departure:</strong> {response.flight?.departure}</p>
          <p><strong>Arrival:</strong> {response.flight?.arrival}</p>
          <p><strong>Price:</strong> ₹{response.flight?.price}</p>

          <h4>🏨 Hotel Details</h4>
          <p><strong>Name:</strong> {response.hotel?.name}</p>
          <p><strong>Check-in:</strong> {response.hotel?.checkin}</p>
          <p><strong>Check-out:</strong> {response.hotel?.checkout}</p>
          <p><strong>Price/Night:</strong> ₹{response.hotel?.price_per_night}</p>
          <p><strong>Total:</strong> ₹{response.hotel?.total_cost}</p>

          <h4>💰 Total Trip Cost</h4>
          <p style={{ fontWeight: 'bold' }}>₹{response.total_cost}</p>
        </div>
      )}

      {response?.error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          ❌ Claude returned an invalid or unstructured response.
          <pre style={{ backgroundColor: '#fff0f0', padding: '1rem' }}>{response.raw_response}</pre>
        </div>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          ❌ Network Error: {error}
        </p>
      )}
    </div>
  );
}
