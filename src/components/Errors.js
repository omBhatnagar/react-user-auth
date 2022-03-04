import "./errors.css";

const Errors = ({ errorState, ifError }) => {
	return (
		<ul className={ifError ? "errors" : "none"}>
			{errorState.map((error) => {
				return <li>{error}</li>;
			})}
		</ul>
	);
};

export default Errors;
