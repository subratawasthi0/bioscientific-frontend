import React, { useState } from 'react';
import { api } from '../api'; // Make sure this path is correct!

function SubmitEvent() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // 👈 This is exactly where you paste your code!
  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      // 1. Upload the Image first
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('folder', 'events');

      const uploadRes = await api.post('/uploads', formData, true);
      const imageUrl = uploadRes.data.url; // Get the MinIO URL

      // 2. Send the Event payload with the imageUrl
      const eventData = {
        title: title,
        location: location,
        eventDate: eventDate,
        imageUrl: imageUrl
      };
      
      await api.post('/dashboard/events', eventData);
      alert('Event created successfully!');
      
      // Reset the form
      setTitle('');
      setLocation('');
      setEventDate('');
      setImageFile(null);

    } catch (error) {
      alert('Failed to create event: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleAddEvent} className="container" style={{ padding: '40px 0' }}>
      <h2>Create New Event</h2>
      <div className="form-group">
        <label>Event Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Event Date</label>
        <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Event Image</label>
        {/* 👈 This is the input your JS code looks for */}
        <input type="file" id="eventImageInput" onChange={(e) => setImageFile(e.target.files[0])} required />
      </div>
      <button type="submit" className="btn-primary">Create Event</button>
    </form>
  );
}

export default SubmitEvent;