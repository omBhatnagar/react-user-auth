import { useState } from "react";
import "./formPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({
	name,
	setName,
	email,
	setEmail,
	password,
	setPassword,
	setLoggedIn,
	errors,
}) => {
	// State
	const [password1, setPassword1] = useState("");
	const navigate = useNavigate();

	// Function to handle submit
	const submitHandler = async (e) => {
		e.preventDefault();
		if (name === "" || password === "" || email === "") {
			errors.push("Fields can not be empty!");
		} else if (password != password1) {
			errors.push("The passwords do not match!");
		} else if (name.length < 6) {
			errors.push("Name should be longer than 5 characters!");
		} else if (password.length < 6) {
			errors.push("Password must be longer than 5 characters!");
		}
		if (errors.length === 0) {
			try {
				let data = { name, email, password };
				const response = await axios.post(
					"https://user-auth-apii.herokuapp.com/api/v1/register",
					data
				);
				console.log(response);
				setLoggedIn(true);
				navigate("/");
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log(errors);
			errors = [];
			setName("");
			setPassword("");
			setPassword1("");
			setEmail("");
		}
	};
	return (
		<div className="form-wrapper">
			<h3>Register</h3>
			<form onSubmit={submitHandler}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name={name}
					value={name}
					placeholder={"Enter name"}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name={email}
					value={email}
					placeholder={"Enter email address"}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name={password}
					value={password}
					placeholder={"Enter password"}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor="password">Confirm Password</label>
				<input
					type="password"
					name={password1}
					value={password1}
					placeholder={"Re enter password"}
					onChange={(e) => setPassword1(e.target.value)}
				/>
				<button type="submit" className="btn">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
