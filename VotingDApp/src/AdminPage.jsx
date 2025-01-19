// AdminPage.js
import React, { useState } from 'react';
import './App.css';
const AdminPage = ({ contract }) => {
    const [candidateData, setCandidateData] = useState({
        firstName: '',
        lastName: '',
        idNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contract.methods.addCandidate(
                candidateData.firstName,
                candidateData.lastName,
                candidateData.idNumber
            ).send({ from: window.ethereum.selectedAddress });
            alert('Candidate added successfully!');
        } catch (error) {
            console.error('Error adding candidate:', error);
            alert('Error adding candidate. Please try again.');
        }
    };

    return (
        <div>
            <h2>Admin Page</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={candidateData.firstName} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={candidateData.lastName} onChange={handleChange} />
                </label>
                <label>
                    ID Number:
                    <input type="text" name="idNumber" value={candidateData.idNumber} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AdminPage;
