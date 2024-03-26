// AddCow.js
import React, { useState } from 'react';
import CowRepository from '../Class/CowRepository.jsx';

const AddCow = () => {
    const [newCow, setNewCow] = useState({
        name: '',
        breed: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCow((prevNewCow) => ({
            ...prevNewCow,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that all fields are filled
        if (!newCow.name || !newCow.breed || !newCow.address) {
            alert('Please fill in all fields.');
            return;
        }

        // Add the new cow directly using CowRepository
        CowRepository.addCow(newCow);

        // Clear the form
        setNewCow({
            name: '',
            breed: '',
            address: '',
        });
    };

    return (
        <div className="container">
            <h1>Add Cow</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newCow.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Breed:</label>
                    <input
                        type="text"
                        name="breed"
                        value={newCow.breed}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={newCow.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Cow</button>
            </form>
        </div>
    );
};

export default AddCow;
