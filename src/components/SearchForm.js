import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


const UserCard = ({ user }) => {
	const { name, picture, dob, gender, location, email, phone } = user;

	return (
		<div className="w-80 mx-auto bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
			<div className="flex items-center p-4">
				<div className="flex-shrink-0 h-20 w-20">
					<img className="h-full w-full object-cover rounded-full" src={picture.large} alt={name.first} />
				</div>
				<div className="ml-4">
					<p className="text-lg font-semibold">{`${name.first} ${name.last}`}</p>
				</div>
			</div>
			<div className="px-4 pb-4 text-gray-700 capitalize">
				<p>{`Age: ${dob.age}`}</p>
				<p>{`Gender: ${gender}`}</p>
				<p>{`Location: ${location.city}, ${location.country}`}</p>
				<p className="normal-case">{`Email: ${email}`}</p>
				<p>{`Phone: ${phone}`}</p>
			</div>
		</div>
	)
}

const UserTest = ({ users }) => {
	return (
		<div className="container mx-auto transition-grid duration-300">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
				{users.map((user, index) => (
					<UserCard key={index} user={user} />
				))}
			</div>
		</div>
	)
}

const SearchForm = ({ onSubmit }) => {
	const [query, setQuery] = useState({
		results: 10,
		country: '',
		minAge: 18,
		maxAge: 60,
		gender: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setQuery({ ...query, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(query)
		onSubmit(query);
	};

	return (
		<div className="container mx-auto flex justify-center items-center h-screen">
			<form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold mb-4">Search Users</h2>
				<div className="mb-4">
					<label htmlFor="results" className="block font-medium">Number of results:</label>
					<input type="number" id="results" name="results" value={query.results} onChange={handleChange} className="w-full border rounded-md p-2 mt-1" />
				</div>
				<div className="mb-4">
					<label htmlFor="country" className="block font-medium">Country:</label>
					<input type="text" id="country" name="country" value={query.country} onChange={handleChange} className="w-full border rounded-md p-2 mt-1" />
				</div>
				<div className="mb-4">
					<label htmlFor="minAge" className="block font-medium">Minimum Age:</label>
					<input type="number" id="minAge" name="minAge" value={query.minAge} onChange={handleChange} className="w-full border rounded-md p-2 mt-1" />
				</div>
				<div className="mb-4">
					<label htmlFor="maxAge" className="block font-medium">Maximum Age:</label>
					<input type="number" id="maxAge" name="maxAge" value={query.maxAge} onChange={handleChange} className="w-full border rounded-md p-2 mt-1" />
				</div>
				<div className="mb-4">
					<label htmlFor="gender" className="block font-medium">Gender:</label>
					<select id="gender" name="gender" value={query.gender} onChange={handleChange} className="w-full border rounded-md p-2 mt-1">
						<option value="">Any</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Search</button>
			</form>
		</div>
	);
};
