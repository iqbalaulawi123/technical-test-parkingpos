import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            // Simulate API call
            const response = await new Promise(resolve => setTimeout(() => {
                if (username === 'user' && password === 'password') {
                    resolve({
                        success: true, 
                        user: { 
                            username: 'user', 
                            tenant_id: 'T00001',
                            tenant_name: 'GRAND INDONESIA'
                        }
                    });
                } else {
                    resolve({ success: false, message: 'Invalid credentials' });
                }
            }, 1000));

            if (response.success) {
                setUser(response.user);
                return true;
            } else {
                setError(response.message);
                return false;
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};