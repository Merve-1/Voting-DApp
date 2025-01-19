import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './App.css';

const Welcome = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleRedirect = () => {
        // Check if the user is an admin or a regular user based on some condition
        const isAdmin = true; // Change this condition based on your logic

        // Redirect the user to the appropriate page
        if (isAdmin) {
            navigate('/admin');
        } else {
            navigate('/user');
        }
    };

    return (
        <div>
            <h2>Welcome to the Voting App</h2>
            <p>This is the welcome page. Please login to continue.</p>
            <button onClick={handleRedirect}>Login</button>
        </div>
    );
};

export default Welcome;
