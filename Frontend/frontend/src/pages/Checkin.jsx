import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Checkin() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const [vehicleNum, setVehicleNum] = useState('');
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [selectedTenant, setSelectedTenant] = useState('');
    const [selectedGate, setSelectedGate] = useState('');

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [gates, setGates] = useState([]);

    const [loadingVehicleTypes, setLoadingVehicleTypes] = useState(true);
    const [loadingTenants, setLoadingTenants] = useState(true);
    const [loadingGates, setLoadingGates] = useState(true);

    const [errorVehicleTypes, setErrorVehicleTypes] = useState(null);
    const [errorTenants, setErrorTenants] = useState(null);
    const [errorGates, setErrorGates] = useState(null);

    //validasi plat nomor
    const [isValidVehicleNum, setIsValidVehicleNum] = useState(null);
    const plateRegex = /^[A-Z]{1,2}\s\d{1,4}\s?[A-Z]{0,3}$/;
    const handleChangeVehicleNum = (e) => {
        let value = e.target.value.toUpperCase().replace(/\s+/g, ''); // remove spaces & uppercase

        // Group by pattern: AA, 1–4 angka, 0–3 huruf
        const match = value.match(/^([A-Z]{1,2})(\d{1,4})?([A-Z]{0,3})?$/);

        //matchnya itu return ([yg diinput, grup 1(^([A...)), grup 2 (\d{1...) , grup 3 ([A-...)])
        if (match) {
            //array pertama ga diambil
            let [, prefix, numbers, suffix] = match;
            let formatted = prefix;
            if (numbers) formatted += ` ${numbers}`;
            if (suffix) formatted += ` ${suffix}`;

            setVehicleNum(formatted);
            setIsValidVehicleNum(plateRegex.test(formatted));
        }
        else {
            setVehicleNum(value);
            setIsValidVehicleNum(false);
        }
    };

    //load first
    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {
                setLoadingVehicleTypes(true);
                const response = await axios.get('http://localhost:8080/api/v1/vehicle-type');
                if (response.data && Array.isArray(response.data.data)) {
                    setVehicleTypes(response.data.data);
                    if (response.data.data.length > 0) {
                        setSelectedVehicleType(response.data.data[0].vehicleType);
                    }
                } else {
                    console.error('API response for vehicle types is not an array or missing data property:', response.data);
                    setVehicleTypes([]);
                }
            } catch (error) {
                console.error('Error fetching vehicle types:', error);
                setErrorVehicleTypes('Failed to load vehicle types.');
            } finally {
                setLoadingVehicleTypes(false);
            }
        };

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
                    console.error('API response for tenants is not an array or missing data property:', response.data);
                    setTenants([]);
                }
            } catch (error) {
                console.error('Error fetching tenants:', error);
                setErrorTenants('Failed to load tenants.');
            } finally {
                setLoadingTenants(false);
            }
        };

        fetchVehicleTypes();
        fetchTenants();
    }, []);

    useEffect(() => {
        const fetchGates = async () => {
            if (selectedTenant) {
                try {
                    setLoadingGates(true);
                    const response = await axios.get(`http://localhost:8080/api/v1/gate-tenants?tenantId=${selectedTenant}&type=IN`);
                    if (response.data && Array.isArray(response.data.data)) {
                        setGates(response.data.data);
                        if (response.data.data.length > 0) {
                            setSelectedGate(response.data.data[0].gateId);
                        }
                    } else {
                        console.error('API response for gates is not an array or missing data property:', response.data);
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
    
    const handleCheckin = async () => {
        if (!isValidVehicleNum) {
            alert('Please enter a valid vehicle number.');
            return;
        }

        const checkinData = {
            vehicleNum,
            vehicleType: selectedVehicleType,
            tenantId: selectedTenant,
            gateId: selectedGate,
        };

        try {
            if(checkinData.vehicleNum == null || checkinData.vehicleNum == ''){
                alert("Vehicle Number cannot be empty")
            }else if(checkinData.vehicleType == null || checkinData.vehicleType == ''){
                alert("Vehicle Type cannot be empty")
            }else if(checkinData.tenantId == null || checkinData.tenantId == ''){
                alert("Tenant Type cannot be empty")
            }else if(checkinData.gateId == null || checkinData.gateId == ''){
                alert("Tenant Type cannot be empty")
            }else if(isValidVehicleNum == false){
                console.log(checkinData.vehicleNum)
                alert("Vehicle number is not valid")
            }else{
                const response = await fetch('http://localhost:8080/api/v1/tickets/check-in', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(checkinData),
                });
                if (response.ok) {
                    alert('Check-in successful!');
                    // reset form fields
                    setVehicleNum('');
                    setSelectedVehicleType(vehicleTypes.length > 0 ? vehicleTypes[0].vehicleType : '');
                    setSelectedTenant(tenants.length > 0 ? tenants[0].tenantId : '');
                    setSelectedGate(gates.length > 0 ? gates[0].gateId : '');
                    setIsValidVehicleNum(null);
                } else {
                    const errorData = await response.json();
                    alert(`Check-in error: ${errorData.message || response.statusText}`);
                }
            }
        } catch (error) {
            console.error('Error check-in:', error);
            alert('Error check in ticket');
        }
    };

    return (
        <main id="pageCheckIn" className='my-4'>
            <div>
                <div className="w-full max-w-7xl mx-auto px-4 mb-4">
                    <div className="grid grid-cols-1 rounded-lg bg-blue-50 p-4">
                        {/* Badge inside */}
                        <span className="inline-block mb-2 rounded bg-blue-100 text-blue-700 text-sm px-2 py-1 font-semibold">
                            Entry Camera
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="text-center">
                                <img
                                    src="https://placehold.co/400x300?text=Entry+Face+Photo"
                                    className="w-full h-56 object-cover rounded"
                                />
                                <h3 className="mt-2 text-sm text-gray-700 font-medium text-left">Front Face</h3>
                            </div>
                            <div className="text-center">
                                <img
                                    src="https://placehold.co/400x300?text=Entry+Plate+Photo"
                                    className="w-full h-56 object-cover rounded"
                                />
                                <h3 className="mt-2 text-sm text-gray-700 font-medium text-left">License Plate</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-4'>
                <div className="max-w-full mx-auto border rounded-lg shadow-sm bg-white p-6 space-y-3">
                    <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                            License Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="license-plate"
                                name="license-plate"
                                type="text"
                                maxLength="11"
                                value={vehicleNum}
                                onChange={handleChangeVehicleNum}
                                placeholder="Example : B 1234 ACD"
                                className={`block w-full rounded-md px-4 py-2 text-lg font-semibold uppercase border ${isValidVehicleNum === null
                                    ? 'border-gray-300'
                                    : isValidVehicleNum
                                        ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                                        : 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    } focus:outline-none focus:ring-1`}
                            />
                            {isValidVehicleNum === false && (
                                <p className="mt-2 text-sm text-red-600">Format tidak valid. Contoh: B 1234 ACD</p>
                            )}
                            {isValidVehicleNum && (
                                <p className="mt-2 text-sm text-green-600"></p>
                            )}
                        </div>
                    </div>
                    <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                        Vehicle Type
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            id="vehicle-type"
                            name="vehicle-type"
                            value={selectedVehicleType}
                            onChange={(e) => setSelectedVehicleType(e.target.value)}
                            className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option>Select Vehicle Type</option>
                            {loadingVehicleTypes && <option>Loading vehicle types...</option>}
                            {errorVehicleTypes && <option>{errorVehicleTypes}</option>}
                            {!loadingVehicleTypes && !errorVehicleTypes && vehicleTypes.length === 0 && <option>No vehicle types available</option>}
                            {Array.isArray(vehicleTypes) && vehicleTypes.map((type) => (
                                <option key={type.vehicleType} value={type.vehicleType}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <div >
                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
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
                                    <option>Select Tenant</option>
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
                        <div >
                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                Gate
                            </label>
                            <div className='grid w-full'>
                                <select
                                    id="gate"
                                    name="gate"
                                    value={selectedGate}
                                    onChange={(e) => setSelectedGate(e.target.value)}
                                    className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option>Select Gate</option>
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
                    <div className='mt-8'>
                        <button
                            onClick={handleCheckin}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                        >
                            Check in
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}