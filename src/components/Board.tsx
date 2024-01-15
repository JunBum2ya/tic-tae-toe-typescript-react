import { useState } from "react";
import "../css/Board.css";
import Square from "./Square";

const calucateWinner = (squares: (string|null)[]): string|null => {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,5],[2,4,6]
  ];
  for(const line of lines) {
    const [a,b,c] = line;
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board = () => {
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ isNext, setNext ] = useState(false);

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    const square = newSquares[i];
    if(!square && calucateWinner(newSquares) === null) {
      newSquares[i] = isNext ? 'O' : 'X';
      setNext(isNext => !isNext);
      setSquares(newSquares);
    }
  };

  const renderSquare = (i: number) => {
    return (<Square value={ squares[i] } onClick={() => handleClick(i)}/>);
  };

  const winner = calucateWinner(squares);
  const status = winner ? `winner : ${winner}` : squares.every((square) => square !== null ) ? 'Draw!' : `Next Plyaer: ${isNext ? 'O' : 'X'}`;

  return (
    <div>
      <div className="status">{ status }</div>
      <div className="board-row">
        { renderSquare(0) }
        { renderSquare(1) }
        { renderSquare(2) }
      </div>
      <div className="board-row">
        { renderSquare(3) }
        { renderSquare(4) }
        { renderSquare(5) }
      </div>
      <div className="board-row">
        { renderSquare(6) }
        { renderSquare(7) }
        { renderSquare(8) }
      </div>
    </div>
  );
};

export default Board;