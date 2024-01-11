// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    // Fetch contacts from the API
    axios.get(API_URL)
      .then(response => setContacts(response.data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  const handleAddContact = () => {
    // Dummy POST call for adding a new contact
    axios.post(API_URL, newContact)
      .then(response => setContacts(prevContacts => [...prevContacts, response.data]))
      .catch(error => console.error('Error adding contact:', error));

    // Clear the input fields
    setNewContact({ name: '', email: '', phone: '' });
  };

  const handleUpdateContact = () => {
    // Dummy PUT call for updating a contact
    axios.put(`${API_URL}/${editingContact.id}`, editingContact)
      .then(response => {
        setContacts(prevContacts => prevContacts.map(contact => (contact.id === response.data.id ? response.data : contact)));
        setEditingContact(null);
      })
      .catch(error => console.error('Error updating contact:', error));
  };

  const handleDeleteContact = (id) => {
    // Dummy DELETE call for deleting a contact
    axios.delete(`${API_URL}/${id}`)
      .then(() => setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id)))
      .catch(error => console.error('Error deleting contact:', error));
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <div className="app">
      <h1>Contact List</h1>

      {/* Add Contact */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>

      {/* Contact List */}
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} className="contact-details">
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <div className="contact-actions">
            <button onClick={() => handleEdit(contact)}>Edit</button>
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
            </div>
            
          </li>
        ))}
      </ul>

      {/* Update Contact */}
      {editingContact && (
        <div>
          <h2>Edit Contact</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingContact.name}
            onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            value={editingContact.email}
            onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            value={editingContact.phone}
            onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
          />
          <button onClick={handleUpdateContact}>Update Contact</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
