import React, { useState } from "react";
import PropTypes from "prop-types";

const Square = props => {
	const [letter, setLetter] = useState("");
	const [on, setOn] = useState(true);

	return (
		<div
			className="iAmSquare"
			onClick={() => {
				if (on == true) {
					let x = props.whoGoes(props.player, props.id);
					let y = props.cIcon(x);
					setLetter(y);
					setOn(false);
				}
			}}>
			{letter}
		</div>
	);
};

Square.propTypes = {
	cIcon: PropTypes.func,
	whoGoes: PropTypes.func,
	player: PropTypes.bool,
	id: PropTypes.number
};

export default Square;
