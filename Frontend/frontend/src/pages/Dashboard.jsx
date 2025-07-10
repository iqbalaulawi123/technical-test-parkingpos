import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faSquareCaretUp } from '@fortawesome/free-regular-svg-icons';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    const goToCheckIn = () => navigate("/check-in");
    const goToCheckOut = () => navigate("/check-out");

    return (
        <>
            {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
                    <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
                    <p className="text-gray-700 mb-6">You are logged in.</p>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Logout
                    </button>
                </div>
            </div> */}

            <main id="actionSelector" className='my-4'>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
                    <div className="flex justify-center gap-4">
                        
                        <button
                            id="go-to-check-in"
                            onClick={goToCheckIn}
                            className="shadow-xl py-4 w-full text-3xl rounded-full bg-emerald-700 px-4 py-2 text-sm text-white  hover:bg-emerald-800 mx-auto">
                            <div className='text-2xl'>
                                <FontAwesomeIcon icon={faSquareCaretDown} />
                            </div>
                            <div className='text-xl'>
                                Check-in
                            </div>
                        </button>
                        <button
                            id="go-to-check-out"
                            onClick={goToCheckOut}
                            className="shadow-xl py-4 w-full text-3xl rounded-full bg-rose-600 px-4 py-2 text-sm text-white  hover:bg-rose-700 mx-auto">
                            <div className='text-2xl'>
                                <FontAwesomeIcon icon={faSquareCaretUp} />
                            </div>
                            <div className='text-xl'>
                                Check-out
                            </div>
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;