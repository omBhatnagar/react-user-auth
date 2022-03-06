import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./formPage.css";
import Errors from "./Errors";

const Login = ({
	email,
	setEmail,
	password,
	setPassword,
	setLoggedIn,
	errors,
	errorState,
	setErrorState,
	setActualEmail,
}) => {
	// Initializing state
	const [ifError, setIfError] = useState(false);
	const navigate = useNavigate();

	// Handle submit
	const submitHandler = async (e) => {
		e.preventDefault();
		if (password === "" || email === "") {
			errors.push("Fields can not be empty!");
		}
		if (password.length < 6) {
			errors.push("Password must be longer than 5 characters!");
		}

		setErrorState(errors);

		if (errors.length === 0) {
			setIfError(false);
			try {
				const data = { email, password };
				const response = await axios.post(
					"https://user-auth-apii.herokuapp.com/api/v1/login",
					data
				);
				console.log(response);
				setLoggedIn(true);
				setActualEmail(email);
				setEmail("");
				setPassword("");
				navigate("/");
			} catch (err) {
				console.log(err);
			}
		} else {
			setIfError(true);
			setPassword("");
		}
	};

	return (
		<div className="form-wrapper">
			<h3>Login</h3>
			<form onSubmit={submitHandler}>
				<label htmlFor="username">Email</label>
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
				<button type="submit" className="btn">
					Log in
				</button>
			</form>
			<p>
				Don't have an account?{" "}
				<button className="redirect" onClick={() => navigate("/register")}>
					Sign Up
				</button>
			</p>
			<Errors errorState={errorState} ifError={ifError} />
		</div>
	);
};

export default Login;
