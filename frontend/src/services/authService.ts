const API_URL = 'http://localhost:5000/api/auth';

export const login = async (credentials: any) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    return response.json();
};

export const signup = async (userData: any) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const getProfile = async (token: string) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
    });
    return response.json();
};
