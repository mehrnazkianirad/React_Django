// Import
import { useState } from "react";// Hook for managing state
import axios from "axios";// Library for making HTTP requests

// SignupForm component
const SignupForm = () => {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm(name, lastname, username, password, email); // Validate the form

        if (!isValid) return; // Prevent form submission if invalid

        const hashedPassword = await hashPassword(password); // Hash the password

        const response = await axios.post("/api/signup/", {
            name,
            lastname,
            username,
            hashedPassword,
            email,
        });

        if (response.status === 200) {
            // Handle successful registration
            // Redirect to the appropriate page or display a success message
        } else {
            handleSignupError(response.status); // Handle different error cases
        }
    };

    const validateForm = (username, password, email) => {
        // Implement form validation logic
        // Check if all fields are filled and meet the required format
        // Return true if the form is valid, false otherwise
    };

    const hashPassword = async (password) => {
        // Implement password hashing using a secure algorithm like bcrypt or sha256
        // Return the hashed password
    };

    const handleSignupError = (status) => {
        // Handle different error cases based on the response status
        // Display relevant error messages to the user
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default SignupForm;
