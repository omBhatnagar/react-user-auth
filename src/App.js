import "./App.css";
import { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
	// Initialise state
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState("");
	const [errorState, setErrorState] = useState([]);
	const errors = [];

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							loggedIn ? (
								<Home setLoggedIn={setLoggedIn} />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route
						path="/login"
						element={
							<Login
								email={email}
								setEmail={setEmail}
								password={password}
								setPassword={setPassword}
								setLoggedIn={setLoggedIn}
								errors={errors}
								errorState={errorState}
								setErrorState={setErrorState}
							/>
						}
					/>
					<Route
						path="/register"
						element={
							<Register
								email={email}
								setEmail={setEmail}
								name={name}
								setName={setName}
								password={password}
								setPassword={setPassword}
								setLoggedIn={setLoggedIn}
								errors={errors}
								errorState={errorState}
								setErrorState={setErrorState}
							/>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
