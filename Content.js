const TicTac = {
    cPlayer: "X", // Tracks current player (X or O)
    state: Array(9).fill(null), // Board state (null for empty cells)
    gameOver: false, // Indicates if the game is over

    // Initialize the game
    init() {
        this.cBoard();
        document
            .getElementById("reset")
            .addEventListener("click", () => this.reset());
        document.getElementById("board").addEventListener("click", (e) => this.handleClick(e)); // Handle clicks on the board
    },

    // Create the game board dynamically
    cBoard() {
        const board = document.getElementById("board");
        board.innerHTML = ""; // Clear previous board
        this.state.forEach((_, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
        });
        this.uMessage(`${this.cPlayer}'s turn`); // Use backticks for string interpolation
    },

    // Handle a cell click
    handleClick(e) {
        const cell = e.target;
        const i = cell.dataset.index;

        // Ignore clicks if game is over or cell is taken
        if (this.gameOver || !cell.classList.contains("cell") || this.state[i])
            return;

        // Update board state and UI
        this.state[i] = this.cPlayer;
        cell.textContent = this.cPlayer;
        cell.classList.add("taken");

        // Check for winner or tie
        const winCombo = this.checkWin();
        if (winCombo) {
            this.highlight(winCombo);
            this.uMessage(`${this.cPlayer} wins!`); // Use backticks for string interpolation
            this.gameOver = true;
        } else if (this.state.every((cell) => cell)) {
            this.uMessage("It's a tie!");
            this.gameOver = true;
        } else {
            // Switch players
            this.cPlayer = this.cPlayer === "X" ? "O" : "X";
            this.uMessage(`${this.cPlayer}'s turn`); // Use backticks for string interpolation
        }
    },

    // Check if there's a winning combination
    checkWin() {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Columns
            [0, 4, 8],
            [2, 4, 6], // Diagonals
        ];
        return wins.find((combo) =>
            combo.every((i) => this.state[i] === this.cPlayer)
        );
    },

    // Highlight winning cells
    highlight(combo) {
        combo.forEach((i) => {
            document.getElementById("board").children[i].style.color = "red";
        });
    },

    // Reset the game
    reset() {
        this.state = Array(9).fill(null);
        this.cPlayer = "X";
        this.gameOver = false;
        this.cBoard();
    },

    // Update the game status message
    uMessage(msg) {
        document.getElementById("message").textContent = msg;
    },
};

// Start the game
TicTac.init();
