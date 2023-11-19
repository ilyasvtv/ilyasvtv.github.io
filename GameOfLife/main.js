const area = document.getElementById("area");
const ctx = area.getContext("2d");

const size_input = document.querySelectorAll(".size-input");
const size_btn = document.getElementById("size-btn");
const generation_btn = document.getElementById("generation-btn");
const types_of_brush = document.getElementsByName("type");
const start_button = document.getElementById("start-btn");
const pause_button = document.getElementById("pause-btn");
const draw_mode = document.getElementsByName("draw-mode")[0];

const CELL_SIZE = 8;
const ALIVE = 1;
const DEAD = 0;
const ROW = 0;
const COL = 1;
const OFFSET = 1;
const SPEED = 70;
const ALIVE_COLOR = "#202020";
const DEAD_COLOR = "#4a9578";
const states = [DEAD_COLOR, ALIVE_COLOR];
let row_cells = Number(size_input[ROW].value);
let col_cells = Number(size_input[COL].value);
let brush = ALIVE;
let on_draw_mode = false;
let game_status = false;
let interval_id;
let width;
let height
let board;
let new_board;

const clearArea = () => {
    for (let r = 0; r < row_cells; r++) {
        for (let c = 0; c < col_cells; c++) {
            const x = r * CELL_SIZE;
            const y = c * CELL_SIZE;
            const size = CELL_SIZE - OFFSET;
            ctx.fillStyle = DEAD_COLOR;
            ctx.fillRect(x, y, size, size);
        }
    }
}

const createBoard = () => {
    const board = [];
    for (let r = 0; r < row_cells; r++) {
        board.push(new Array(col_cells).fill(0))
    }
    return board;
}

const calculateProperties = () => {
    width = row_cells * CELL_SIZE;
    height = col_cells * CELL_SIZE;
    area.width = width;
    area.height = height;
    board = createBoard();
    new_board = createBoard();
    clearArea();
}

calculateProperties();

const countNbors = ( board, states, r0, c0 ) => {
    const nbors = new Array(states).fill(0);
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr != 0 || dc != 0) {
                const r = ((r0 + dr) % row_cells + row_cells) % row_cells;
                const c = ((c0 + dc) % col_cells + col_cells) % col_cells;
                nbors[board[r][c]]++;
            }
        }
    }
    return nbors.join("");
}

// explanation of below
// first number is dead, second number is alive
// for example:
//     "53" means that there is "5" dead and "3" alive neighbours around a cell
//     "default" means that there is other combinations of alive and dead neighbours
//     2 objects in array for both cases (dead and alive accordingly);
// so, association is replace of switch case
// btw, association is very good at expanding to other types of game of life comparing to trivial switch case and if statements
// also we can representate this association with "n"-dimensional array (in this case, with 2-dimensional array)
const association_of_GoL = [
    {
        "53": 1,
        "default": 0
    },
    {
        "62": 1,
        "53": 1,
        "default": 0
    }
]

const computeNextBoard = ( current, next, states ) => {
    for (let r = 0; r < row_cells; r++) {
        for (let c = 0; c < col_cells; c++) {
            const nbors = countNbors(current, states, r, c);
            next[r][c] = association_of_GoL[current[r][c]][nbors] === undefined ? association_of_GoL[current[r][c]]["default"] : association_of_GoL[current[r][c]][nbors];
        }
    }
}

const paintCell = ( board, r, c ) => {
    const x = r * CELL_SIZE;
    const y = c * CELL_SIZE;
    const size = CELL_SIZE - OFFSET;
    ctx.fillStyle = states[board[r][c]];
    ctx.fillRect(x, y, size, size);
}

const render = ( current, past, allowFullRender = false ) => {
    for (let r = 0; r < row_cells; r++) {
        for (let c = 0; c < col_cells; c++) {
            if (current[r][c] === past[r][c] && !allowFullRender) continue;
            paintCell(current, r, c);
        }
    }
}

const generateRandomly = () => {
    for (let r = 0; r < row_cells; r++) {
        for (let c = 0; c < col_cells; c++) {
            board[r][c] = Math.round(Math.random());
        }
    }
    const allowFullRender = true;
    render(board, new_board, allowFullRender);
}

const draw = () => {
    computeNextBoard(board, new_board, states.length);
    [board, new_board] = [new_board, board]; 
    render(board, new_board);
}

const pause = () => {
    game_status = false;
    clearInterval(interval_id);
}

//Event Listeners
types_of_brush.forEach(type => {
    type.addEventListener("change", () => {
        brush = Number(type.value);
    })
})

area.addEventListener("click", (e) => {
    const r = Math.floor(e.offsetX / CELL_SIZE);
    const c = Math.floor(e.offsetY / CELL_SIZE);
    board[r][c] = brush;
    paintCell(board, r, c)
})

size_btn.addEventListener("click", () => {
    let row_quantity = Number(size_input[ROW].value);
    let cell_quantity = Number(size_input[COL].value);
    if (row_quantity < 0) {
        row_quantity = 0;
        size_input[ROW].value = 0;
    }
    if (cell_quantity < 0) {
        cell_quantity = 0;
        size_input[COL].value = 0;
    }
    row_cells = row_quantity;
    col_cells = cell_quantity;
    draw_mode.checked = false;
    on_draw_mode = false;
    types_of_brush[ALIVE].checked = true;
    brush = ALIVE;
    pause();
    calculateProperties();
})

generation_btn.addEventListener("click", () => {
    generateRandomly();
    pause();
})

start_button.addEventListener('click', () => {
    if (game_status) return;
    game_status = true;
    interval_id = setInterval(draw, SPEED)
})

pause_button.addEventListener('click', () => {
    pause();
})

draw_mode.addEventListener("change", (e) => {
    const draw_mode_status = e.target.checked;
    on_draw_mode = draw_mode_status;
})

area.addEventListener("mousemove", (e) => {
    if (!on_draw_mode) return;
    const r = Math.floor(e.offsetX / CELL_SIZE);
    const c = Math.floor(e.offsetY / CELL_SIZE);
    board[r][c] = brush;
    paintCell(board, r, c);
})