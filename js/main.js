const setupGame = () => {
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const cross = () => {
    const el = document.createElement("div");
    el.classList.add("cross");
    return el;
  };
  const circle = () => {
    const el = document.createElement("div");
    el.classList.add("circle");
    return el;
  };
  const playerSwitcher = () => {
    let current = 0;
    const reset = () => {
      current = 0;
      return current;
    };
    const next = () => {
      current = current ^ 1;
      return current;
    };
    return { next, reset };
  };
  const updateScreen = (currentPlayer) => {
    const rows = document.querySelector(".grid").children;
    for (let i = 0; i < rows.length; i++) {
      const columns = rows[i].children;
      for (let j = 0; j < columns.length; j++) {
        const cell = columns[j];
        cell.innerHTML = "";
        switch (board[i][j]) {
          case 0:
            cell.appendChild(circle());
            break;
          case 1:
            cell.appendChild(cross());
            break;
        }
      }
    }
    gameText = document.querySelector(".game-text > p:last-child");
    gameText.innerText = `${currentPlayer === 0 ? "X" : "O"} to play`;
  };
  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      // Check vertical wins
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== null
      ) {
        return board[i][0];
      }
      // Check horizontal wins
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== null
      ) {
        return board[0][i];
      }
    }
    if (
      (board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[2][2] !== null) ||
      (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[0][2] !== null)
    ) {
      return board[1][1];
    }
    return -1;
  };

  const player = playerSwitcher();
  const place = (pos) => {
    const x = pos[0];
    const y = pos[1];
    if (board[x][y] === null) {
      const currentPlayer = player.next();
      board[x][y] = currentPlayer;
      updateScreen(currentPlayer);
      winner = checkWinner();
      switch (winner) {
        case 0:
          console.log(`player O wins`);
          reset();
          gameText = document.querySelector(".game-text > p:last-child");
          gameText.innerText = `Player O won. ${
            currentPlayer === 0 ? "X" : "O"
          } to play`;
          break;
        case 1:
          console.log(`player X wins`);
          reset();
          gameText = document.querySelector(".game-text > p:last-child");
          gameText.innerText = `Player X won. ${
            currentPlayer === 0 ? "X" : "O"
          } to play`;
          break;
      }
    }
  };

  const reset = () => {
    console.log("resetting");
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        board[i][j] = null;
      });
    });
    player.reset();
    updateScreen();
  };
  const printBoard = () => {
    console.log(board);
  };
  return { place, printBoard, reset };
};

function setupTiles() {
  const rows = document.querySelector(".grid").children;
  for (let i = 0; i < rows.length; i++) {
    const columns = rows[i].children;
    for (let j = 0; j < columns.length; j++) {
      const x = i;
      const y = j;
      columns[j].addEventListener("click", (i, j) => {
        game.place([x, y]);
        // game.printBoard();
      });
    }
  }
  const resetBtn = document.querySelector(".reset > button");
  resetBtn.addEventListener("click", () => {
    game.reset();
  });
}

const game = setupGame();
setupTiles();
