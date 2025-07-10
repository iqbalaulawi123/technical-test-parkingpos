import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from '../context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faSquareCaretUp } from '@fortawesome/free-regular-svg-icons';

export default function ActionSelector() {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const goToCheckIn = () => navigate("/check-in");
    const goToCheckOut = () => navigate("/check-out");

    if (!user) {
        return null; // Or a loading spinner, or a message
    }

    return (
        <main id="actionSelector" className='my-4'>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
    );
}