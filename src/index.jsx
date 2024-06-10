import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


const UserCard = ({ user }) => {
	const { name, picture, dob, gender, location, email, phone } = user

	// easter egg time
	if (email === "andrewj.ballard94@gmail.com") {
		return (
			<div className="w-80 mx-auto bg-amber-100 shadow-lg shadow-amber-900 rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer">
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

	return (
		<div className="w-80 mx-auto bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer">
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
	// I want to start with something that shows the UI for at least a few rows of cards
	const [query, setQuery] = useState({
		results: 10,
		country: '',
		gender: ''
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setQuery({ ...query, [name]: value })
	}

	// I don't generally use forms - I can't explain why but I really don't like e.preventDefault().
	// Normally I serialize an object and attach a function to the click event of a button, but I figured you would want to see that I knew this too
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(query)
		onSubmit(query)
	}

	// multi-line editing ftw (also you can see the country codes listed here: https://randomuser.me/documentation#nationalities:~:text=v1.4%3A%20AU%2C%20BR%2C%20CA%2C%20CH%2C%20DE%2C%20DK%2C%20ES%2C%20FI%2C%20FR%2C%20GB%2C%20IE%2C%20IN%2C%20IR%2C%20MX%2C%20NL%2C%20NO%2C%20NZ%2C%20RS%2C%20TR%2C%20UA%2C%20US)
	// that's an ugly url... Anyway it's specified in the docs as v1.4's country list
	const countryOptions = [
		{ value: 'AU', label: 'Australia' },
		{ value: 'BR', label: 'Brazil' },
		{ value: 'CA', label: 'Canada' },
		{ value: 'CH', label: 'Switzerland' },
		{ value: 'DE', label: 'Germany' },
		{ value: 'DK', label: 'Denmark' },
		{ value: 'ES', label: 'Spain' },
		{ value: 'FI', label: 'Finland' },
		{ value: 'FR', label: 'France' },
		{ value: 'GB', label: 'United Kingdom' },
		{ value: 'IE', label: 'Ireland' },
		{ value: 'IN', label: 'India' },
		{ value: 'IR', label: 'Iran' },
		{ value: 'MX', label: 'Mexico' },
		{ value: 'NL', label: 'Netherlands' },
		{ value: 'NO', label: 'Norway' },
		{ value: 'NZ', label: 'New Zealand' },
		{ value: 'RS', label: 'Serbia' },
		{ value: 'TR', label: 'Turkey' },
		{ value: 'UA', label: 'Ukraine' },
		{ value: 'US', label: 'United States' }
	]

	// honestly this was the longest part. Input forms are super important, and there are a million libraries for handling them. I almost always default to HTML-ish.
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
					<select id="country" name="country" value={query.country} onChange={handleChange} className="w-full border rounded-md p-2 mt-1">
						<option value="">Select Country</option>
						{countryOptions.map(option => (
							<option key={option.value} value={option.value}>{option.label}</option>
						))}
					</select>
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
	)
}


const Page = () => {
	const Andy = { // heyo
		cell: "(818) 584 4721",
		dob: { date: "1994-11-01T22:58:00.668Z", age: 29 },
		email: "andrewj.ballard94@gmail.com",
		gender: "male",
		location: { street: { number: 19600, name: "NE 3rd St" }, city: "Camas", state: "Washingtoní", country: "United States", postcode: 98607 },
		name: { title: "Mr", first: "Andrew", last: "Ballard" },
		nat: "US",
		phone: "(818) 584 4721",
		picture: { large: "/andy.png" }
	}

	const [users, setUsers] = useState([Andy])
	const [searchVisible, setSearchVisible] = useState(true) // eslint-disable-line no-unused-vars

	const handleSearchSubmit = (query) => {
		const params = new URLSearchParams()

		params.append('results', query.results)

		if (query.country) {
			params.append('nat', query.country)
		}

		if (query.gender) {
			params.append('gender', query.gender)
		}

		setSearchVisible(false)

		fetch(`https://randomuser.me/api/?${params.toString()}`)
			.then(response => response.json())
			.then(data => {
				const newData = data.results
				newData.shift() // make way for Andy
				setUsers([Andy, ...newData])
			})
			.catch(error => console.error('Error fetching users:', error))
	};
	return (
		<>
			<SearchForm onSubmit={handleSearchSubmit} />
			<UserTest users={users} />
		</>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Page />
	</React.StrictMode>
)
