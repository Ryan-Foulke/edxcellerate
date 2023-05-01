import React, { useState, useEffect } from 'react';
import axios from 'axios';


function NewPathway(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    
    try {
      const response = await axios.post('http://localhost:8000/api/pathways/', {
        name,
        description,
      });
      console.log('New pathway created:', response.data);
      // clear the form inputs
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating new pathway:', error);
    }
  };
  

  return (
    <div className="container mt-5">
    <h3>Create New Pathway</h3>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea className="form-control" id="description" rows="3" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Create</button>
    </form>
    </div>
  );
}

export default NewPathway;
