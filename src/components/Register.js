import { useState } from "react";
import "./formPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";

const Register = ({
	name,
	setName,
	email,
	setEmail,
	password,
	setPassword,
	setLoggedIn,
	errors,
	errorState,
	setErrorState,
}) => {
	// State
	const [password1, setPassword1] = useState("");
	const [ifError, setIfError] = useState(false);
	const navigate = useNavigate();

	// Function to handle submit
	const submitHandler = async (e) => {
		e.preventDefault();
		if (name === "" || password === "" || email === "") {
			errors.push("Fields can not be empty!");
		}
		if (password != password1) {
			errors.push("The passwords do not match!");
		}
		if (name.length < 6) {
			errors.push("Name should be longer than 5 characters!");
		}
		if (password.length < 6) {
			errors.push("Password must be longer than 5 characters!");
		}

		setErrorState(errors);

		if (errors.length === 0) {
			setIfError(false);
			try {
				let data = { name, email, password };
				const response = await axios.post(
					"https://user-auth-apii.herokuapp.com/api/v1/register",
					data
				);
				console.log(response);
				setLoggedIn(true);
				setErrorState([]);
				setEmail("");
				setPassword("");
				setPassword1("");
				setName("");
				navigate("/");
			} catch (err) {
				console.log(err);
			}
		} else {
			setIfError(true);
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
			<p>
				Already a user?{" "}
				<button className="redirect" onClick={() => navigate("/login")}>
					Log In
				</button>
			</p>
			<Errors errorState={errorState} ifError={ifError} />
		</div>
	);
};

export default Register;
