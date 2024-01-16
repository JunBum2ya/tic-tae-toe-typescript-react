import { useState } from "react";
import "../css/Board.css";
import Square from "./Square";
import Stack from "../util/Stack";

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
  const [ squares, setSquares ] = useState(Array<string | null>(9).fill(null));
  const [ isNext, setNext ] = useState(false);
  const [ history, setHistory ] = useState(new Stack<(string | null)[]>());

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    const square = newSquares[i];
    if(!square && calucateWinner(newSquares) === null) {
      newSquares[i] = isNext ? 'O' : 'X';
      setNext(isNext => !isNext);
      setSquares(squares => newSquares);
      history.push(squares);
    }
  };

  //초기화 버튼을 클릭했을 경우
  const redo = () => {
    setSquares(Array(9).fill(null));
    setNext(false);
    history.clear();
  };
  //이전으로 돌아가기
  const undo = () => {
    if(history.size() > 0) {
      const prevSquare = history.pop()??[];
      setNext(prev => !prev);
      setSquares(squares => prevSquare);
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
      <div className="button-list">
        <button className="redo" onClick={redo}>
          다시 시작하기
        </button>
        <button className="undo" onClick={undo}>
          되돌아가기
        </button>
      </div>
    </div>
  );
};

export default Board;