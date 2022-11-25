import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

interface SProps {
  value: string,
  onClick: () => void;
}

interface SState {
  value: string,
}

function Square({ value, onClick }: SProps) {
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

interface BProps {
  squares: string[],
  onClick: (i: number) => void
}

interface BState {

}

class Board extends React.Component<BProps, BState> {
  renderSquare(i: number) {
    return <Square
      value={this.props.squares && this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
      </div>
    );
  }
}

interface GProps {

}

interface GState {
  history: ({squares: string[]})[],
  xIsNext: boolean,
}

class Game extends React.Component<GProps, GState> {
  constructor(props: GProps) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    }
  }

  handleClick(i: number) {
    const history = this.state.history
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          </div>
        <div className="game-info">
          <div>{ status }</div>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
  );
  }
}

function calculateWinner(squares: string[]) {
  const lines: (number[])[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null
}

// ========================================
// @ts-ignore
const Document: HTMLElement | DocumentFragment = document.getElementById("root");
const root: ReactDOM.Root = ReactDOM.createRoot(Document);
root.render(<Game />);
