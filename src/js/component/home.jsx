import React, { Fragment, useEffect, useState } from "react";
import Square from "./square.jsx";

import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Home() {
	const init = [];
	const [board, setBoard] = useState(init);
	const [showNewGame, setShowNewGame] = useState(true);
	const [showTable, setShowTable] = useState(true);
	const [showButton, setShowButton] = useState(true);
	const [quantity, setQuantity] = useState(0);
	const [turn, setTurn] = useState(false);
	const [position, setPosition] = useState(init);
	const [playerTurn, setPlayerTurn] = useState("");
	//Si sumamos todos nos dan multiplos de 3, es posible tirar por ahi?
	const winningLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	//Cambiamos los iconos segun el turno
	const changeIcon = click => {
		let dash = "";
		click == false
			? (dash = <FontAwesomeIcon icon={faUser} />)
			: (dash = <FontAwesomeIcon icon={faRobot} />);
		return dash;
	};
	//Guardamos la informacion de la posicion y cambiamos el turno
	const Game = (start, id) => {
		start == false ? setTurn(true) : setTurn(false);
		setPosition([...position, id]);
		return start;
	};
	//Comprobamos quien Gana
	const didItWin = (list, positions) => {
		for (let index = 0; index < list.length; index++) {
			if (
				positions.includes(list[index][0]) &&
				positions.includes(list[index][1]) &&
				positions.includes(list[index][2])
			) {
				return true;
			}
		}
	};

	//Rellenamos los cuadros
	const newTable = () => {
		let newBoard = [];

		for (let i = quantity; i <= quantity + 8; i++) {
			newBoard.push(
				<Square
					key={i.toString()}
					id={i}
					cIcon={changeIcon}
					whoGoes={Game}
					player={turn}
				/>
			);
		}

		console.log("veces que funciono");
		return newBoard;
	};
	const newGame = () => {
		location.reload();
	};

	//Primer usEffect para el cambio de los iconos
	useEffect(() => {
		if (turn == false) {
			setPlayerTurn(
				<div>
					<h2 className="tictac">Es el turno de: </h2>
					<h3 className="turn">
						<FontAwesomeIcon icon={faUser} />
					</h3>
				</div>
			);
		} else {
			setPlayerTurn(
				<div>
					<h2 className="tictac">Es el turno de: </h2>
					<h3 className="turn">
						<FontAwesomeIcon icon={faRobot} />
					</h3>
				</div>
			);
		}
	}, [turn]);
	//Segundo useEffect para la revision del ganador
	useEffect(() => {
		let playPositions = [];
		if (position.length > 4) {
			turn != false
				? (playPositions = position.filter((_, indx) => indx % 2 == 0))
				: (playPositions = position.filter((_, indx) => indx % 2 != 0));
			playPositions.sort(function(a, b) {
				return a - b;
			});

			if (turn == true && didItWin(winningLines, playPositions)) {
				setShowNewGame(!showNewGame);

				setPlayerTurn(
					<div>
						<h2 className="turn">
							<FontAwesomeIcon icon={faUser} />{" "}
						</h2>
						<h3 className="tictac">Ha ganado!</h3>
					</div>
				);
			} else if (turn == false && didItWin(winningLines, playPositions)) {
				setShowNewGame(!showNewGame);

				setPlayerTurn(
					<div>
						<h2 className="turn">
							<FontAwesomeIcon icon={faRobot} />{" "}
						</h2>
						<h3 className="tictac">Ha ganado!</h3>
					</div>
				);
			} else if (position.length >= 9) {
				setShowNewGame(!showNewGame);

				setPlayerTurn(
					<div>
						<h2 className="turn">
							<FontAwesomeIcon icon={faRobot} /> /
							<FontAwesomeIcon icon={faUser} />{" "}
						</h2>
						<h3 className="tictac">Empate!</h3>
					</div>
				);
			}
		}
	}, [position]);
	//empezamos el primer juego

	useEffect(() => {
		setBoard(newTable());
	}, [turn]);
	return (
		<Fragment>
			<div>
				<h1 className="tictac">Tic Tac Toe </h1>
				<div className="container">
					<div>
						<button
							className={showButton ? "btn" : "hidden"}
							onClick={() => {
								setShowButton(!showButton);
								setShowTable(!showTable);
							}}>
							Un Jugador
						</button>
						<button
							className={showButton ? "btn" : "hidden"}
							onClick={() => {
								setShowButton(!showButton);
								setShowTable(!showTable);
							}}>
							Multijugador
						</button>
					</div>
				</div>

				<div className={showTable ? "hidden" : ""}>{playerTurn}</div>
				<div className="container">
					<button
						className={showNewGame ? "hidden" : "btn"}
						onClick={() => {
							location.reload();
						}}>
						New Game
					</button>
				</div>

				<div
					className={
						showTable ? "hidden" : showNewGame ? "table" : "hidden"
					}>
					{board}
				</div>
			</div>
		</Fragment>
	);
}
