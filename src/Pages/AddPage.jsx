import React, { useState } from 'react';
import Sidenav from '../Elements/SideNav';
import './AddPage.css';

export const AddPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission, e.g., sending data to backend
        console.log('Form data:', formData);
        // Reset form fields
        setFormData({
            name: '',
            breed: '',
            address: ''
        });
    };

    return (
        <div className="add-page">
            <Sidenav />
            <div className="add-form-container">
                <div className="add-form">
                    <h1>Add a Cow</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="breed">Breed:</label>
                            <input type="text" id="breed" name="breed" value={formData.breed} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
