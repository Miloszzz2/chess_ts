import './css/style.css'
import './css/chess24-pieces.css'
const board = document.getElementById('board');
const squares = document.querySelectorAll('.square')
const initial_board = [
  [{ piece: 'r', color: 'black' }, { piece: 'n', color: 'black' }, { piece: 'b', color: 'black' }, { piece: 'q', color: 'black' }, { piece: 'k', color: 'black' }, { piece: 'b', color: 'black' }, { piece: 'n', color: 'black' }, { piece: 'r', color: 'black' }],
  [{ piece: 'p', color: 'black' }, { piece: 'p', color: 'black' }, { piece: 'p', color: 'black' }, { piece: 'p', color: 'black' }, { piece: 'p', color: 'black' }, { piece: 'p', color: 'black' }, { piece: 'p', color: 'black' }, { piece: 'p', color: 'black' }],
  [{ piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }],
  [{ piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }],
  [{ piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }],
  [{ piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }, { piece: '.', color: 'none' }],
  [{ piece: 'p', color: 'white' }, { piece: 'p', color: 'white' }, { piece: 'p', color: 'white' }, { piece: 'p', color: 'white' }, { piece: 'p', color: 'white' }, { piece: 'p', color: 'white' }, { piece: 'p', color: 'white' }, { piece: 'p', color: 'white' }],
  [{ piece: 'r', color: 'white' }, { piece: 'n', color: 'white' }, { piece: 'b', color: 'white' }, { piece: 'q', color: 'white' }, { piece: 'k', color: 'white' }, { piece: 'b', color: 'white' }, { piece: 'n', color: 'white' }, { piece: 'r', color: 'white' }],
];

squares.forEach((square, index) => {
  const piece = document.createElement('div');
  console.log(index % 8)
  console.log(Math.floor(index / 8))
  if (initial_board[Math.floor(index / 8)][index % 8].piece != '.') {

    piece.classList.add(...['piece', initial_board[Math.floor(index / 8)][index % 8].piece, initial_board[Math.floor(index / 8)][index % 8].color])

  } square.appendChild(piece);
})
