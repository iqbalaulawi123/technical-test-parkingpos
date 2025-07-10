import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faSquareCaretUp } from '@fortawesome/free-regular-svg-icons';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SketchTemplate() {
    const [plate, setPlate] = useState('');
    const [isValid, setIsValid] = useState(null);

    const plateRegex = /^[A-Z]{1,2}\s\d{1,4}\s?[A-Z]{0,3}$/;

    const handleChange = (e) => {
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

            setPlate(formatted);
            setIsValid(plateRegex.test(formatted));
        }
        else {
            setPlate(value);
            setIsValid(false);
        }
    };
    return (
        <>
            <div className="min-h-full font-sans">
                <Disclosure as="nav" className="shadow-lg bg-gray-800 rounded-b-xl">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="hidden md:block">
                                    <div className="flex items-baseline space-x-4">
                                        <div className='text-xl font-medium text-white'>Parking POS</div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            {userNavigation.map((item) => (
                                                <MenuItem key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                    >
                                                        {item.name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>
                </Disclosure>
                <header className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">Welcome, username</h1>
                    </div>
                </header>
                <main id="actionSelector" className='my-4'>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex justify-center gap-4">
                            <button id="go-to-check-in" className="shadow-xl py-4 w-full text-3xl rounded-full bg-emerald-700 px-4 py-2 text-sm text-white  hover:bg-emerald-800 mx-auto">
                                <div className='text-2xl'>
                                    <FontAwesomeIcon icon={faSquareCaretDown} />
                                </div>
                                <div className='text-xl'>
                                    Check-in
                                </div>
                            </button>
                            <button id="go-to-check-out" className="shadow-xl py-4 w-full text-3xl rounded-full bg-rose-600 px-4 py-2 text-sm text-white  hover:bg-rose-700 mx-auto">
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
                                        value={plate}
                                        onChange={handleChange}
                                        placeholder="Example : B 1234 ACD"
                                        className={`block w-full rounded-md px-4 py-2 text-lg font-semibold uppercase border ${isValid === null
                                            ? 'border-gray-300'
                                            : isValid
                                                ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                                                : 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                            } focus:outline-none focus:ring-1`}
                                    />
                                    {isValid === false && (
                                        <p className="mt-2 text-sm text-red-600">Format tidak valid. Contoh: B 1234 ACD</p>
                                    )}
                                    {isValid && (
                                        <p className="mt-2 text-sm text-green-600"></p>
                                    )}
                                </div>
                            </div>
                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                Vehicle Type
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option>MOBIL</option>
                                    <option>MOTOR</option>
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
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            <option>Grand Indonesia</option>
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
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            <option>Gate In</option>
                                        </select>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className='mt-8'>
                                <button className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
                                    Check in
                                </button>
                            </div>

                        </div>
                    </div>
                </main>
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
                                    maxLength="11"
                                    placeholder="XXXX-XXXX-XXXXX"
                                    className="flex-1 rounded-md px-4 py-2 text-lg font-semibold uppercase border border-gray-300"
                                />
                                <button
                                    id="search-ticket-number"
                                    type="button"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-md"
                                >
                                    Search
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
                                <span id="summary-gate-in">--</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700">Vehicle Type:</span>
                                <span id="summary-vehicle-type">--</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700">Check-in:</span>
                                <span id="summary-indate">--</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700">Check-out:</span>
                                <span id="summary-outdate">--</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700">Rate:</span>
                                <span><span id="summary-rate">--</span> / Hour</span>
                            </div>
                            <div className="flex justify-between text-base font-semibold pt-2 border-t mt-2">
                                <span>Total:</span>
                                <span id="summary-total">--</span>
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
                                            autoComplete="tenant"
                                            className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            <option>Grand Indonesia</option>
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
                                            id="gate-out"
                                            name="gate-out"
                                            autoComplete="gate-out"
                                            className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            <option>Gate Out</option>
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
                                        className="outline col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option>CASH</option>
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>
                            <button className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 rounded">
                                Checkout
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
