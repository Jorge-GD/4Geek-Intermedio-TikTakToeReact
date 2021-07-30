import React, { Fragment, useEffect, useState } from "react";
import Square from "./square.jsx";
import Form from "./form.jsx";

import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Home() {
	const [turn, setTurn] = useState(1);
	let board = [];
	let positionBoard=[];

	const changeIcon = click => {
		let dash = "";
		click == 1
			? (dash = <FontAwesomeIcon icon={faCircle} />)
			: (dash = <FontAwesomeIcon icon={faTimes} />);
		return dash;
	};

	const whosTurn = turn => {
		let ash = "";
		turn % 2 == 0
			? (ash = <FontAwesomeIcon icon={faTimes} />)
			: (ash = <FontAwesomeIcon icon={faCircle} />);

		return ash;
	};

	const begin = start => {
		start == 1 ? setTurn(2) : setTurn(1);

		return start;
	};

	const fillSquare = (id, click) =>{}



	

	for (let i = 0; i <= 8; i++) {
		board.push(
			<Square
				key={i.toString()}
				id={i + 10}
				cIcon={changeIcon}
				whoGoes={begin}
				player={turn}
			/>
		);
		 
	}

	return (
		<Fragment>
			<Form />

			<div>
				<h1 className="tictac">Tic Tac Toe </h1>
				<h2 className="tictac">Es el turno de: </h2>
				<h3 className="turn">{whosTurn(turn)}</h3>
				<div className="table">{board}</div>
			</div>
		</Fragment>
	);
}
