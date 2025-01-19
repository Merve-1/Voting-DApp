import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const UserPage = ({ contract }) => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        idNumber: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contract.methods.addUser(
                userData.firstName,
                userData.lastName,
                userData.idNumber,
                userData.email,
                userData.password,
                window.ethereum.selectedAddress
            ).send({ from: window.ethereum.selectedAddress });
            alert('User added successfully!');

            // Redirect the user to the voting page after successful submission
            navigate('/voting');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user. Please try again.');
        }
    };


    return (
        <div>
            <h2>User Page</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
                </label>
                <label>
                    ID Number:
                    <input type="text" name="idNumber" value={userData.idNumber} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={userData.password} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserPage;
