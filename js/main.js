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
    return () => {
      current = current ^ 1;
      return current;
    };
  };
  const updateScreen = () => {
    const rows = document.querySelector(".grid").children;
    for (let i = 0; i < rows.length; i++) {
      const columns = rows[i].children;
      for (let j = 0; j < columns.length; j++) {
        const cell = columns[j];
        cell.innerHTML = "";
        switch (board[i][j]) {
          case 0:
            cell.appendChild(cross());
            break;
          case 1:
            cell.appendChild(circle());
            break;
        }
      }
    }
  };

  const player = playerSwitcher();
  const place = (pos) => {
    const x = pos[0];
    const y = pos[1];
    if (board[x][y] === null) {
      board[x][y] = player();
      updateScreen();
    }
  };

  const reset = () => {
    console.log("resetting")
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        board[i][j] = null;
      })
    })
    updateScreen()
  }
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
        game.printBoard();
      });
    }
  }
  const resetBtn = document.querySelector(".reset > button")
  resetBtn.addEventListener("click", () => {
    game.reset()
  })
}

const game = setupGame();
setupTiles();
