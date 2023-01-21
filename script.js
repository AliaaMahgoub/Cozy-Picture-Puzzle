const IMGS =
[
  "pieces/row-1-column-1.png", "pieces/row-1-column-2.png", "pieces/row-1-column-3.png", "pieces/row-1-column-4.png",
  "pieces/row-2-column-1.png", "pieces/row-2-column-2.png", "pieces/row-2-column-3.png", "pieces/row-2-column-4.png",
  "pieces/row-3-column-1.png", "pieces/row-3-column-2.png", "pieces/row-3-column-3.png", "pieces/row-3-column-4.png",
  "pieces/row-4-column-1.png", "pieces/row-4-column-2.png", "pieces/row-4-column-3.png", "pieces/row-4-column-4.png"
];

const CORRECT_IMGS =
[
  "pieces/row-1-column-1.png", "pieces/row-1-column-2.png", "pieces/row-1-column-3.png", "pieces/row-1-column-4.png",
  "pieces/row-2-column-1.png", "pieces/row-2-column-2.png", "pieces/row-2-column-3.png", "pieces/row-2-column-4.png",
  "pieces/row-3-column-1.png", "pieces/row-3-column-2.png", "pieces/row-3-column-3.png", "pieces/row-3-column-4.png",
  "pieces/row-4-column-1.png", "pieces/row-4-column-2.png", "pieces/row-4-column-3.png", "pieces/row-4-column-4.png"
];

const TILES = 
[
  "1_1", "1_2", "1_3", "1_4",
  "2_1", "2_2", "2_3", "2_4",
  "3_1", "3_2", "3_3", "3_4",
  "4_1", "4_2", "4_3", "4_4"
];   

const SELECTED = [];

let GAMEON = false;

let initialize = () =>
{
  document.querySelector("#shuffleBtn").addEventListener("click", function() {shuffle(IMGS)});
  TILES.forEach(id => document.getElementById(id).addEventListener("click", function() {if (GAMEON){select(id)}}));
}

let select = (id) =>
{
    console.log(SELECTED);
    if (SELECTED.length < 2)
    {
      SELECTED.push(id);
      document.getElementById(SELECTED[0]).style.opacity = "0.5";
    }
    if (SELECTED.length === 2)
    {
      document.getElementById(SELECTED[0]).style.opacity = "1";
      swap();
    }
}

let swap = () =>
{
  tempSecond = document.getElementById(SELECTED[1]).src;
  document.getElementById(SELECTED[1]).src = document.getElementById(SELECTED[0]).src;
  document.getElementById(SELECTED[0]).src = tempSecond;
  SELECTED.pop(0); SELECTED.pop(1);
  check();
}

let shuffle = (arr) =>
{
  GAMEON=true;
  shuffledArr = arr;
  let currentIndex = shuffledArr.length,  randomIndex;
  while (currentIndex !== 0)
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffledArr[currentIndex], shuffledArr[randomIndex]] = [shuffledArr[randomIndex], shuffledArr[currentIndex]];
  }

  for (let i = 0; i < shuffledArr.length; i++)
  {
    document.getElementById(TILES[i]).src = shuffledArr[i];
  }

  check();
}

let check = () =>
{
  let currentPuzzle = TILES.map(id => document.getElementById(id).src);
  let solved = true;
  let numMisplaced = 0;
  for (let i = 0; i < TILES.length; i++){
    if (currentPuzzle[i].indexOf(CORRECT_IMGS[i]) === -1){
      solved = false;
      numMisplaced++;
    }
  }
  solved ? document.getElementById("congratulatory message").innerHTML = "You did it!" : document.getElementById("congratulatory message").innerHTML = `${numMisplaced} pieces are misplaced`;
  if (solved) {GAMEON=false;}
}