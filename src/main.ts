import "./css/style.css";
import "./css/chess24-pieces.css";

class Chess {
	squares = document.querySelectorAll(".square") as NodeListOf<HTMLElement>;
	#initialBoard = [
		[
			{ piece: "r", color: "black" },
			{ piece: "n", color: "black" },
			{ piece: "b", color: "black" },
			{ piece: "q", color: "black" },
			{ piece: "k", color: "black" },
			{ piece: "b", color: "black" },
			{ piece: "n", color: "black" },
			{ piece: "r", color: "black" },
		],
		[
			{ piece: "p", color: "black" },
			{ piece: "p", color: "black" },
			{ piece: "p", color: "black" },
			{ piece: "p", color: "black" },
			{ piece: "p", color: "black" },
			{ piece: "p", color: "black" },
			{ piece: "p", color: "black" },
			{ piece: "p", color: "black" },
		],
		[
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
		],
		[
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
		],
		[
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
		],
		[
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
			{ piece: ".", color: "none" },
		],
		[
			{ piece: "p", color: "white" },
			{ piece: "p", color: "white" },
			{ piece: "p", color: "white" },
			{ piece: "p", color: "white" },
			{ piece: "p", color: "white" },
			{ piece: "p", color: "white" },
			{ piece: "p", color: "white" },
			{ piece: "p", color: "white" },
		],
		[
			{ piece: "r", color: "white" },
			{ piece: "n", color: "white" },
			{ piece: "b", color: "white" },
			{ piece: "q", color: "white" },
			{ piece: "k", color: "white" },
			{ piece: "b", color: "white" },
			{ piece: "n", color: "white" },
			{ piece: "r", color: "white" },
		],
	];

	constructor() {
		this.squares.forEach((square, index) => {
			square.setAttribute("row", Math.floor(index / 8).toString());
			square.setAttribute("col", (index % 8).toString());

			if (this.#initialBoard[Math.floor(index / 8)][index % 8].piece !== ".") {
				const piece = document.createElement("div");
				piece.setAttribute("draggable", "true");
				piece.addEventListener("dragstart", (e) => {
					this.#dragStart(
						e,
						piece,
						this.#initialBoard[Math.floor(index / 8)][index % 8].piece,
						Math.floor(index / 8),
						index % 8,
						this.#initialBoard[Math.floor(index / 8)][index % 8].color,
					);
				});
				piece.addEventListener("dragend", () => {
					this.#dragEnd(piece);
				});

				piece.classList.add(
					...[
						"piece",
						this.#initialBoard[Math.floor(index / 8)][index % 8].piece,
						this.#initialBoard[Math.floor(index / 8)][index % 8].color,
					],
				);
				square.appendChild(piece);
			}
			square.addEventListener("dragover", (e) => {
				this.#dragOver(e);
			});
			square.addEventListener("drop", (e) => {
				this.#drop(e);
			});
		});
	}

	#dragOver(e: DragEvent) {
		e.preventDefault();
		if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
	}

	#dragPiece(e: DragEvent) {
		const el = e.target as HTMLElement;
		e.dataTransfer?.setData("text", el.outerHTML);
	}

	#dragStart(
		e: DragEvent,
		piece: HTMLElement,
		pieceVal: string,
		row: number,
		col: number,
		color: string,
	) {
		this.#dragPiece(e);
		piece.style.opacity = "0.7";
		piece.classList.add("dragging");
		this.#calculatePossibleMoves(pieceVal, row, col, color);
	}
	#dragEnd(piece: HTMLElement) {
		piece.style.opacity = "1";
		piece.classList.remove("dragging");
	}
	#drop(e: DragEvent) {
		e.preventDefault();
		const data = e.dataTransfer?.getData("text");
		const draggedElement = document.querySelector(".dragging");

		if (!data) return;

		const dropElement = e.target as HTMLElement;

		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = data;
		const piece = tempDiv.firstChild as HTMLElement;

		const row = Number.parseInt(
			draggedElement?.parentElement?.getAttribute("row") as string,
		);
		const col = Number.parseInt(
			draggedElement?.parentElement?.getAttribute("col") as string,
		);

		const moves = this.#calculatePossibleMoves(
			this.#initialBoard[row][col].piece,
			row,
			col,
			this.#initialBoard[row][col].color,
		);

		const dropRow = Number.parseInt(
			dropElement?.getAttribute("row") as string,
		) as number;

		const dropCol = Number.parseInt(
			dropElement?.getAttribute("col") as string,
		) as number;

		const dropPos = [dropRow, dropCol];

		piece.addEventListener("dragstart", (e) => {
			this.#dragStart(
				e,
				piece,
				this.#initialBoard[dropRow][dropCol].piece,
				dropRow,
				dropCol,
				this.#initialBoard[dropRow][dropCol].color,
			);
		});
		piece.addEventListener("dragend", () => {
			this.#dragEnd(piece);
		});
		if (
			moves.some((row) => {
				return row.every((value, index) => {
					return value === dropPos[index];
				});
			}) &&
			dropElement.childNodes.length === 0 &&
			dropElement.classList.contains("square")
		) {
			this.#initialBoard[dropRow][dropCol].piece =
				this.#initialBoard[row][col].piece;
			this.#initialBoard[dropRow][dropCol].color =
				this.#initialBoard[row][col].color;
			this.#initialBoard[row][col].color = "none";
			this.#initialBoard[row][col].piece = ".";

			const moves = this.#calculatePossibleMoves(
				this.#initialBoard[dropRow][dropCol].piece,
				row,
				col,
				this.#initialBoard[dropRow][dropCol].piece,
			);
			for (const el of moves) {
				this.squares[el[0] * 8 + el[1]].style.backgroundColor = "";
			}

			dropElement.style.backgroundColor = "";
			dropElement.appendChild(tempDiv.firstChild as HTMLElement);
			if (draggedElement?.parentNode) {
				draggedElement.parentNode.removeChild(draggedElement);
			}
		}
	}

	#calculatePossibleMoves(
		piece: string,
		currentY: number,
		currentX: number,
		color?: string,
	) {
		const moves = [];
		switch (piece) {
			case "p": {
				if (color === "black") {
					if (currentY + 1 < 8) moves.push([currentY + 1, currentX]);
					if (currentY + 2 < 8) moves.push([currentY + 2, currentX]);
				} else {
					if (currentY - 1 < 8) moves.push([currentY - 1, currentX]);
					if (currentY - 2 < 8) moves.push([currentY - 2, currentX]);
				}
				break;
			}
			case "r": {
				for (let i = 0; i < 8; i++) {
					if (i !== currentX) moves.push([currentY, i]);
					if (i !== currentY) moves.push([i, currentX]);
					if (i !== currentX) moves.push([currentY, i * -1]);
					if (i !== currentY) moves.push([i * -1, currentX]);
				}
				break;
			}
			case "n": {
				for (let i = -1; i <= 1; i++) {
					if (i !== 0) {
						if (
							currentX + i >= 0 &&
							currentY + i * 2 >= 0 &&
							currentX + i < 8 &&
							currentY + i * 2 < 8
						) {
							moves.push([currentY + i * 2, currentX + i]);
						}
						if (
							currentY + i >= 0 &&
							currentX + i * 2 >= 0 &&
							currentY + i < 8 &&
							currentX + i * 2 < 8
						) {
							moves.push([currentY + i, currentX + i * 2]);
						}
						if (
							currentX + i >= 0 &&
							currentY + i * -2 >= 0 &&
							currentX + i < 8 &&
							currentY + i * -2 < 8
						) {
							moves.push([currentY + i * -2, currentX + i]);
						}
						if (
							currentY + i >= 0 &&
							currentX + i * -2 >= 0 &&
							currentY + i < 8 &&
							currentX + i * -2 < 8
						) {
							moves.push([currentY + i, currentX + i * -2]);
						}
					}
				}
				break;
			}
			case "b": {
				for (let i = 0; i < 8; i++) {
					if (currentY + i < 8 && currentX + i < 8)
						moves.push([currentY + i, currentX + i]);
					if (currentY - i >= 0 && currentX + i < 8)
						moves.push([currentY - i, currentX + i]);
					if (currentY - i >= 0 && currentX - i >= 0)
						moves.push([currentY - i, currentX - i]);
					if (currentY + i < 8 && currentX - i >= 0)
						moves.push([currentY + i, currentX - i]);
				}
				break;
			}
			case "q": {
				for (let i = 0; i < 8; i++) {
					if (currentY + i < 8 && currentX + i < 8)
						moves.push([currentY + i, currentX + i]);
					if (currentY - i >= 0 && currentX + i < 8)
						moves.push([currentY - i, currentX + i]);
					if (currentY - i >= 0 && currentX - i >= 0)
						moves.push([currentY - i, currentX - i]);
					if (currentY + i < 8 && currentX - i >= 0)
						moves.push([currentY + i, currentX - i]);
				}
				for (let i = 0; i < 8; i++) {
					if (i !== currentX) moves.push([currentY, i]);
					if (i !== currentY) moves.push([i, currentX]);
				}
				break;
			}
			case "k": {
				for (let i = -1; i <= 1; i++) {
					if (i !== 0) {
						if (currentY + i < 8 && currentY + i >= 0)
							moves.push([currentY + i, currentX]);
						if (currentX + i < 8 && currentX + i >= 0)
							moves.push([currentY, currentX + i]);
					}
				}
			}
		}

		for (const el of moves) {
			if (this.squares[el[0] * 8 + el[1]].childNodes.length === 0)
				this.squares[el[0] * 8 + el[1]].style.backgroundColor = "green";
		}
		return moves;
	}
}

new Chess();
