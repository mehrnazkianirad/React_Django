// Import
import { useState } from "react";// Hook for managing state
import axios from "axios";// Library for making HTTP requests

// Loginform component
const LoginForm = () => {

    // State variables
    const [username, setUsername] = useState("");// Stores the entered username
    const [password, setPassword] = useState("");// Stores the entered password

    // `handleSubmit` function
    const handleSubmit = async (e) => {
        e.preventDefault();// Prevent default form submission

        const isValid = validateForm(username, password); // Validate the form

        if (!isValid) return; // Prevent form submission if invalid

        const response = await axios.post('/api/login/', {
            username,
            password,
        });

        if (response.status === 200) {

            const { token, user_id } = response.data;

            securelyStoreToken(token, user_id);// Use a secure method to store the token
            redirectToDashboard();// Redirect to the appropriate page after login

        } else {
            handleLoginError(response.status); // Handle different error cases
        }
    };

    const validateForm = (username, password) => {
        if (!username || !password) { // Check if both fields are not empty
            return false;
        }
        return true;
    }

    const securelyStoreToken = (token, user_id) => { // Securely storing the token and user ID
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/; HttpOnly; Secure`;
        document.cookie = `user_id=${user_id}; expires=${expiryDate.toUTCString()}; path=/; HttpOnly' Secure`;
    }

    const redirectToDashboard = () => {
        window.location.href = "/dashboard";
    }

    const handleLoginError = (status) => {
        switch (status) {
            case 401:// Display an error message for invalid credentials
              alert("Invalid username or password");
              break;

            case 404:// Display an error message for user not found
              alert("User not found");
              break;

            case 500:// Display an error message for internal server error
              alert("An internal server error occurred. Please try again later.");
              break;

            default:// Display a generic error message
              alert("An unknown error occurred. Please try again later.");
          }
    }

    return (
        <div className="login-form">
            <div className="username">
                <label className="user" htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    // placeholder="Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="password">
                <label className="pass" htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    // placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="login-button" type="submit" onClick={handleSubmit}>
                Login
            </button>
            <div id="additional-links">
                <p>Did you forget your password?</p>
                <div className="reset-create">
                    <a href="SignupFoem.jsx" title="reset password">Reset password</a>
                    <a href="Signup.jsx" title="create-account">Create Account</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
