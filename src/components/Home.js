import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = ({ setLoggedIn }) => {
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
			<h1>Home Page</h1>
		</div>
	);
};

export default Home;
