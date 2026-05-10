import React, { useState } from 'react';
import * as authService from '../../services/authService';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await authService.login({ email, password });
            console.log('Login Result:', result);
            if (result.token) {
                localStorage.setItem('token', result.token);
                // Redirect or update state
            }
        } catch (error) {
            console.error('Login Failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
