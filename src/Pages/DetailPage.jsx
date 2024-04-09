import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailPage.css'; // Import the CSS file
import Sidenav from '../Elements/SideNav';

export const DetailPage = () => {
    const [cow, setCow] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCowDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/cows/${id}`);
                if (response.status === 200) {
                    setCow(response.data);
                } else {
                    console.error('Failed to fetch cow details:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching cow details:', error.message);
            }
        };

        fetchCowDetails();
    }, [id]);

    return (
        
        <div className="detail-page">
            <Sidenav />
            <div className="cow-details">
                {cow ? (
                    <div>
                        <h2>{cow.name}</h2>
                        <p><strong>Breed:</strong> {cow.breed}</p>
                        <p><strong>Address:</strong> {cow.address}</p>
                    </div>
                ) : (
                    <p className="loading-message">Loading cow details...</p>
                )}
            </div>
        </div>
    );
};
