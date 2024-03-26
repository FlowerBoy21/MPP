import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Sidenav from '../Elements/SideNav';
import { cow } from '../cow';
import './MasterPage.css';

export const MasterPage = () => {
    const [data, setData] = useState(cow);
    const [editCow, setEditCow] = useState(null);
    const [breedDistribution, setBreedDistribution] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        calculateBreedDistribution();
    }, [data]);

    useEffect(() => {
        renderChart();
    }, [breedDistribution]);

    const calculateBreedDistribution = () => {
        const distribution = {};
        data.forEach(cow => {
            distribution[cow.breed] = (distribution[cow.breed] || 0) + 1;
        });
        setBreedDistribution(distribution);
    };

    const renderChart = () => {
        const canvas = document.getElementById('breedChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }
            canvas.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(breedDistribution),
                    datasets: [{
                        label: 'Cow Breed Distribution',
                        data: Object.values(breedDistribution),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    };

    const handleDetails = (selectedCow) => {
        console.log("Details for:", selectedCow);
    };

    const handleEdit = (selectedCow) => {
        setEditCow(selectedCow);
    };

    const handleDelete = (cowId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this cow?');
        
        if (confirmDelete) {
            const newData = data.filter(cow => cow.id !== cowId);
            setData(newData);
            console.log("Deleted:", cowId);
        } else {
            console.log("Deletion cancelled");
        }
    };

    const handleSortAscending = () => {
        const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setData(sortedData);
    };

    const handleSortDescending = () => {
        const sortedData = [...data].sort((a, b) => b.name.localeCompare(a.name));
        setData(sortedData);
    };

    const handleSaveEdit = (editedData) => {
        const index = data.findIndex(cow => cow.id === editedData.id);
        if (index !== -1) {
            const newData = [...data];
            newData[index] = editedData;
            setData(newData);
            setEditCow(null);
        }
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);

    return (
        <div>
            <Sidenav />
            <div className="cow-container">
                {data.slice(startIndex, endIndex).map((cow, index) => (
                    <div className="cow-card" key={index}>
                        <h2>{cow.name}</h2>
                        <p><strong>Breed:</strong> {cow.breed}</p>
                        <p><strong>Address:</strong> {cow.address}</p>
                        <div className="buttons">
                            <button onClick={() => handleDetails(cow)}>Details</button>
                            <button onClick={() => handleEdit(cow)}>Edit</button>
                            <button onClick={() => handleDelete(cow.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="sort-buttons">
                <button onClick={handleSortAscending}>Sort Ascending</button>
                <button onClick={handleSortDescending}>Sort Descending</button>
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>{"<<"}</button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>{">>"}</button>
            </div>
            {editCow && (
                <div className="edit-form">
                    <h3>Edit Cow</h3>
                    <EditForm cow={editCow} onSave={handleSaveEdit} />
                </div>
            )}
            <canvas id="breedChart"></canvas>
        </div>
    );
};

const EditForm = ({ cow, onSave }) => {
    const [editedCow, setEditedCow] = useState(cow);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCow({ ...editedCow, [name]: value });
    };
    const handleSave = () => {
        onSave(editedCow);
    };

    return (
        <div className="edit-form-container">
            <label>Name:</label>
            <input type="text" name="name" value={editedCow.name} onChange={handleChange} />
            <label>Breed:</label>
            <input type="text" name="breed" value={editedCow.breed} onChange={handleChange} />
            <label>Address:</label>
            <input type="text" name="address" value={editedCow.address} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};
