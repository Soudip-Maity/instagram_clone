import { useState, useEffect } from "react";

/* ---------- Square ---------- */
function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      style={{
        width: "90px",
        height: "90px",
        borderRadius: "14px",
        border: "none",
        background: "linear-gradient(145deg, #1e1e1e, #2b2b2b)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
        fontSize: "40px",
        fontWeight: "bold",
        cursor: "pointer",
        color: value === "X" ? "#4cc9f0" : "#f72585",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {value}
    </button>
  );
}

/* ---------- Game ---------- */
export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // true = human X, false = bot O

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  // Bot move effect
  useEffect(() => {
    if (!xIsNext && !winner) {
      const emptyIndices = squares
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);

      if (emptyIndices.length > 0) {
        const randomIndex =
          emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

        const nextSquares = squares.slice();
        nextSquares[randomIndex] = "O";
        setSquares(nextSquares);
        setXIsNext(true);
      }
    }
  }, [xIsNext, squares, winner]);

  function handleClick(i) {
    if (winner || squares[i] || !xIsNext) return;

    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
    setXIsNext(false);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `🏆 Winner: ${winner}`;
  } else if (isDraw) {
    status = "🤝 Match Draw";
  } else {
    status = `Next Player: ${xIsNext ? "X (You)" : "O (Bot)"}`;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div
        style={{
          backgroundColor: "#111",
          padding: "35px 40px",
          borderRadius: "24px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {/* STATUS */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          {status}
        </div>

        {/* BOARD */}
        {[0, 3, 6].map((row) => (
          <div
            key={row}
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "15px",
              justifyContent: "center",
            }}
          >
            <Square value={squares[row]} onSquareClick={() => handleClick(row)} />
            <Square value={squares[row + 1]} onSquareClick={() => handleClick(row + 1)} />
            <Square value={squares[row + 2]} onSquareClick={() => handleClick(row + 2)} />
          </div>
        ))}

        {/* RESET BUTTON */}
        <button
          onClick={resetGame}
          style={{
            marginTop: "25px",
            padding: "10px 24px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            background: "linear-gradient(45deg, #4cc9f0, #4361ee)",
            color: "#fff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

/* ---------- Winner Logic ---------- */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
