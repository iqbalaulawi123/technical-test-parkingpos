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
            const response = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.status === 200 && data.data && data.data.length > 0) {
                const userData = data.data[0];
                setUser({
                    username: userData.username,
                    tenant_id: userData.tenant.tenantId,
                    tenant_name: userData.tenant.name,
                });
                return true;
            } else {
                setError(data.message);
                return false;
            }
        } catch (err) {
            setError('Something wrong');
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