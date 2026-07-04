// ==============================
// ICONIC MINES SIMULATOR
// ==============================

const board = document.getElementById("board");
const generateBtn = document.getElementById("generate");
const loader = document.getElementById("loader");
const history = document.getElementById("history");
const round = document.getElementById("round");

const GRID_SIZE = 25;
const STAR_COUNT = 4;

let roundNumber = 0;

// ==============================
// CREATION DE LA GRILLE
// ==============================

function createBoard(){

    board.innerHTML = "";

    for(let i = 0; i < GRID_SIZE; i++){

        const cell = document.createElement("div");

        cell.className = "cell";

        cell.dataset.index = i;

        board.appendChild(cell);

    }

}

createBoard();

// ==============================
// GENERATION DES POSITIONS
// ==============================

function generatePrediction(){

    const positions = [];

    while(positions.length < STAR_COUNT){

        const random = Math.floor(Math.random()*GRID_SIZE);

        if(!positions.includes(random)){

            positions.push(random);

        }

    }

    return positions;

}

// ==============================
// ANIMATION DES ETOILES
// ==============================

function revealStars(stars){

    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell=>{

        cell.innerHTML = "";

    });

    stars.forEach((position,index)=>{

        setTimeout(()=>{

            cells[position].innerHTML =
            '<i class="fa-solid fa-star star"></i>';

        },index*300);

    });

}

// ==============================
// HISTORIQUE
// ==============================

function updateHistory(stars){

    const li = document.createElement("li");

    li.innerHTML =
    `<strong>Tour ${roundNumber}</strong> :
    ${stars.map(v=>v+1).join(" - ")}`;

    history.prepend(li);

    if(history.children.length>8){

        history.removeChild(history.lastChild);

    }

}

// ==============================
// LOADER
// ==============================

function showLoader(){

    loader.style.display="flex";

}

function hideLoader(){

    loader.style.display="none";

}

// ==============================
// BOUTON
// ==============================

generateBtn.addEventListener("click",()=>{

    showLoader();

    setTimeout(()=>{

        hideLoader();

        const stars = generatePrediction();

        revealStars(stars);

       roundNumber++;

       round.innerText = roundNumber;

       updateHistory(stars);
    },1800);

});

// ==============================
// PETIT EFFET SUR LES CASES
// ==============================

board.addEventListener("mousemove",(e)=>{

    const target = e.target;

    if(target.classList.contains("cell")){

        target.style.transform="scale(1.05)";

    }

});

board.addEventListener("mouseout",(e)=>{

    const target = e.target;

    if(target.classList.contains("cell")){

        target.style.transform="scale(1)";

    }

});

// ==============================
// GENERATION AU CHARGEMENT
// ==============================

