import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = ({ setLoggedIn, actualEmail }) => {
	const navigator = useNavigate();

	const logOutHandler = (e) => {
		setLoggedIn(false);
		navigator("/login");
	};
	return (
		<div>
			<nav>
				<ul>
					<li>User-Auth</li>
					<li>
						<button className="btn-log-out" onClick={logOutHandler}>
							Log-Out
						</button>
					</li>
				</ul>
			</nav>
			<h1>Hello, {actualEmail}</h1>
		</div>
	);
};

export default Home;
