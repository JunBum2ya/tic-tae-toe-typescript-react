import { useState } from "react";
import '../css/Square.css';

const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={() => props.onClick() }>
      { props.value }
    </button>
  );
};

interface SquareProps {
  value: string | null,
  onClick: () => void
}

export default Square;