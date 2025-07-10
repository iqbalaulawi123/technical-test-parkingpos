import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ChevronDownIcon } from '@heroicons/react/16/solid'



export default function Checkout() {
    const [scan, setScan] = useState(false);
    const [ticketNumber, setTicketNumber] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    //summary ticket
    const [vehicleNum, setVehicleNum] = useState('--');
    const [vehicleType, setVehicleType] = useState('--');
    const [gateIn, setGateIn] = useState('--');
    const [checkInDate, setCheckInDate] = useState('--');
    const [checkOutDateScan, setCheckOutDateScan] = useState('--');
    const [rate, setRate] = useState('--');
    const [formattedDuration, setFormattedDuration] = useState('--');
    const [amount, setAmount] = useState('--');

    const [selectedTenant, setSelectedTenant] = useState('');
    const [selectedGate, setSelectedGate] = useState('');
    const [selectedPaymentType, setSelectedPaymentType] = useState('');

    const [tenants, setTenants] = useState([]);
    const [gates, setGates] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);

    const [loadingTenants, setLoadingTenants] = useState(true);
    const [loadingGates, setLoadingGates] = useState(true);
    const [loadingPaymentType, setLoadingPaymentType] = useState(true);

    const [errorTenants, setErrorTenants] = useState(null);
    const [errorGates, setErrorGates] = useState(null);
    const [errorPaymentType, setErrorPaymentType] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const handleScan = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/tickets/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticketNum: ticketNumber }),
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.status === 200 && responseData.data && responseData.data.length > 0) {
                    const data = responseData.data[0];
                    setScan(true);
                    setVehicleNum(data.vehicleNum || '--');
                    setVehicleType(data.vehicleType || '--');
                    setGateIn(data.gateIn || '--');
                    setCheckInDate(data.checkInDate ? new Date(data.checkInDate).toLocaleString() : '--');
                    setCheckOutDateScan(data.checkOutDateScan ? new Date(data.checkOutDateScan).toLocaleString() : '--');
                    setRate(data.rate || '--');
                    setFormattedDuration(data.formattedDuration || '--');
                    setAmount(data.amount || '--');
                    console.log('Scan successful:', data);
                } else {
                    setScan(false);
                    console.error('Scan failed ', responseData.message);
                }
            } else {
                setScan(false);
                console.error('Scan failed:', response.statusText);
            }
        } catch (error) {
            setScan(false);
            console.error('Error scan:', error);
        }
    };

    const handleCheckout = async () => {
        if (!ticketNumber || !scan) {
            setCheckoutError('Please scan a valid ticket number first.');
            return;
        }

        setCheckoutLoading(true);
        setCheckoutError(null);
        setCheckoutSuccess(false);
        try {
            const response = await fetch('http://localhost:8080/api/v1/tickets/check-out', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticketNum: ticketNumber,
                    tenantId: selectedTenant,
                    gateOut: selectedGate,
                    paymentTypeId: selectedPaymentType,
                    memberSearch: ""
                }),
            });

            const responseData = await response.json();

            if (response.ok && responseData.status === 200) {
                setCheckoutSuccess(true);
                console.log('Checkout successful:', responseData.message);
                // Optionally clear form or navigate
            } else {
                setCheckoutError(responseData.message || 'Checkout failed');
                console.error('Checkout failed:', responseData.message);
            }
        } catch (error) {
            setCheckoutError('An error occurred during checkout.');
            console.error('Error during checkout:', error);
        } finally {
            setCheckoutLoading(false);
        }
    };

    //load first
    useEffect(() => {
        const fetchTenants = async () => {
            try {
                setLoadingTenants(true);
                const response = await axios.get('http://localhost:8080/api/v1/tenants');
                if (response.data && Array.isArray(response.data.data)) {
                    setTenants(response.data.data);
                    if (response.data.data.length > 0) {
                        setSelectedTenant(response.data.data[0].tenantId);
                    }
                } else {
                    setTenants([]);
                }
            } catch (error) {
                console.error('Error fetching tenants:', error);
                setErrorTenants('Failed to load tenants.');
            } finally {
                setLoadingTenants(false);
            }
        };
        const fetchPaymentType = async () => {
            try {
                setLoadingPaymentType(true);
                const response = await axios.get('http://localhost:8080/api/v1/payment-types');
                if (response.data && Array.isArray(response.data.data)) {
                    setPaymentTypes(response.data.data);
                    if (response.data.data.length > 0) {
                        setSelectedPaymentType(response.data.data[0].paymentTypeId);
                    }
                } else {
                    setPaymentTypes([]);
                }
            } catch (error) {
                console.error('Error fetching tenants:', error);
                setErrorPaymentType('Failed to load tenants.');
            } finally {
                setLoadingPaymentType(false);
            }
        };
        fetchTenants();
        fetchPaymentType();
    }, []);

    useEffect(() => {
        const fetchGates = async () => {
            if (selectedTenant) {
                try {
                    setLoadingGates(true);
                    const response = await axios.get(`http://localhost:8080/api/v1/gate-tenants?tenantId=${selectedTenant}&type=OUT`);
                    if (response.data && Array.isArray(response.data.data)) {
                        setGates(response.data.data);
                        if (response.data.data.length > 0) {
                            setSelectedGate(response.data.data[0].gateId);
                        }
                    } else {
                        setGates([]);
                    }
                } catch (error) {
                    console.error('Error fetching gates:', error);
                    setErrorGates('Failed to load gates for selected tenant.');
                } finally {
                    setLoadingGates(false);
                }
            } else {
                setGates([]);
                setSelectedGate('');
            }
        };
        fetchGates();
    }, [selectedTenant]);

    return (
        <>

            <main id="pageCheckOut" className='my-4'>
                <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
                    <div className="max-w-full mx-auto">
                        <label htmlFor="ticket-number" className="block text-sm font-medium text-gray-900">
                            Ticket Number
                        </label>
                        <div className="mt-1 flex gap-2">
                            <input
                                id="ticket-number"
                                name="ticket-number"
                                type="text"
                                placeholder="XXXX-XXXX-XXXXX"
                                value={ticketNumber}
                                onChange={(e) => setTicketNumber(e.target.value)}
                                className="flex-1 rounded-md px-4 py-2 text-lg font-semibold uppercase border border-gray-300"
                            />
                            <button
                                id="scan-ticket-number"
                                type="button"
                                onClick={handleScan}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-md"
                            >
                                Scan
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-4 bg-blue-50">
                                <span className="w-full inline-block mb-2 rounded bg-blue-100 text-blue-700 text-sm px-2 py-1 font-semibold">
                                    Entry Camera
                                </span>
                                <img
                                    src="https://placehold.co/400x300?text=Entry+Face+Photo"
                                    className="w-full h-56 object-cover rounded"
                                />
                                <h3 className="mt-2 text-sm text-gray-700 font-medium">Front Face</h3>
                                <img
                                    src="https://placehold.co/400x300?text=Entry+Plate+Photo"
                                    className="w-full h-56 object-cover rounded mt-4"
                                />
                                <h3 className="mt-2 text-sm text-gray-700 font-medium">License Plate</h3>
                            </div>
                            <div className="border rounded-lg p-4 bg-rose-50">
                                <span className="w-full inline-block mb-2 rounded bg-rose-100 text-rose-700 text-sm px-2 py-1 font-semibold">
                                    Exit Camera
                                </span>
                                <img
                                    src="https://placehold.co/400x300?text=Exit+Face+Photo"
                                    className="w-full h-56 object-cover rounded"
                                />
                                <h3 className="mt-2 text-sm text-gray-700 font-medium">Front Face</h3>
                                <img
                                    src="https://placehold.co/400x300?text=Exit+Plate+Photo"
                                    className="w-full h-56 object-cover rounded mt-4"
                                />
                                <h3 className="mt-2 text-sm text-gray-700 font-medium">License Plate</h3>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-full mx-auto border rounded-lg shadow-sm bg-white p-6 space-y-3">
                        <h2 className="text-lg font-semibold text-gray-800">Parking Summary</h2>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Gate In:</span>
                            <span id="summary-gate-in">{gateIn}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Vehicle Type:</span>
                            <span id="summary-vehicle-type">{vehicleType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Check-in:</span>
                            <span id="summary-indate">{checkInDate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Check-out:</span>
                            <span id="summary-outdate">{checkOutDateScan}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Duration:</span>
                            <span id="summary-outdate">{formattedDuration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Rate:</span>
                            <span><span id="summary-rate">{rate}</span> / Hour</span>
                        </div>
                        <div className="flex justify-between text-base font-semibold pt-2 border-t mt-2">
                            <span>Total:</span>
                            <span id="summary-total">{amount}</span>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <div >
                                <label htmlFor="tenant" className="block text-sm/6 font-medium text-gray-900">
                                    Tenant
                                </label>
                                <div className='grid w-full'>
                                    <select
                                        id="tenant"
                                        name="tenant"
                                        value={selectedTenant}
                                        onChange={(e) => setSelectedTenant(e.target.value)}
                                        className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option>--Select Tenant--</option>
                                        {loadingTenants && <option>Loading tenants...</option>}
                                        {errorTenants && <option>{errorTenants}</option>}
                                        {!loadingTenants && !errorTenants && tenants.length === 0 && <option>No tenants available</option>}
                                        {Array.isArray(tenants) && tenants.map((tenant) => (
                                            <option key={tenant.tenantId} value={tenant.tenantId}>
                                                {tenant.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="gate-out" className="block text-sm/6 font-medium text-gray-900">
                                    Gate Out
                                </label>
                                <div className='grid w-full'>
                                    <select
                                        id="gate"
                                        name="gate"
                                        value={selectedGate}
                                        onChange={(e) => setSelectedGate(e.target.value)}
                                        className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option>--Select Gate--</option>
                                        {loadingGates && <option>Loading gates...</option>}
                                        {errorGates && <option>{errorGates}</option>}
                                        {!loadingGates && !errorGates && gates.length === 0 && <option>No gates available</option>}
                                        {Array.isArray(gates) && gates.map((gate) => (
                                            <option key={gate.gateId} value={gate.gateId}>
                                                {gate.alias}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="payment-type" className="block text-sm font-medium text-gray-900 mt-4">
                                Payment Method
                            </label>
                            <div className='grid w-full'>
                                
                                <select
                                    id="payment-type"
                                    name="payment-type"
                                    autoComplete="payment-type"
                                    value={selectedPaymentType}
                                    onChange={(e) => setSelectedPaymentType(e.target.value)}
                                    className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option>--Select Payment Method--</option>
                                    {loadingPaymentType && <option>Loading payment type...</option>}
                                    {errorPaymentType && <option>{errorPaymentType}</option>}
                                    {!loadingPaymentType && !loadingPaymentType && paymentTypes.length === 0 && <option>No payment type available</option>}
                                    {Array.isArray(paymentTypes) && paymentTypes.map((paymentType) => (
                                        <option key={paymentType.paymentTypeId} value={paymentType.paymentTypeId}>
                                            {paymentType.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                        </div>
                        <button
                            className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleCheckout}
                            disabled={!scan || checkoutLoading}
                        >
                            {checkoutLoading ? 'Processing...' : 'Checkout and Pay'}
                        </button>
                        {checkoutSuccess && (
                            <div className="mt-2 text-center text-green-600 font-semibold">
                                Checkout successful!
                            </div>
                        )}
                        {checkoutError && (
                            <div className="mt-2 text-center text-red-600 font-semibold">
                                Error: {checkoutError}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
