class Game1 {
  constructor() {
    this.numberHole = 9;
    this.score = 0;
    this.point = 2;
    this.gameOver = false;
    this.molangIndex = null;
    this.dechetIndex = null;
    this.molangInterval = null;
    this.dechetInterval = null;
  }

  init() {
    for (let i = 0; i < this.numberHole; i++) {
      this.createHole(i.toString());
    }

    this.molangInterval = setInterval(() => this.setMolang(), 2000);
    this.dechetInterval = setInterval(() => this.setDechet(), 3000);
  }

  createHole(id) {
    let hole = document.createElement("div");
    hole.id = id;
    hole.addEventListener("click", (event) => this.selectTile(event));
    document.getElementById("playgroundGame1").appendChild(hole);
  }

  setMolang() {
    this.clearIndex(this.molangIndex);
    this.molangIndex = this.createAndAppendImage("molang_taupe.png");
  }

  setDechet() {
    this.clearIndex(this.dechetIndex);
    this.dechetIndex = this.createAndAppendImage("molang_chenille.png");
  }

  clearIndex(index) {
    if (index) {
      index.innerHTML = "";
    }
  }

  createAndAppendImage(imageSrc) {
    let index = document.getElementById(Math.floor(this.numberHole * Math.random()).toString());
    let obj = document.createElement("img");
    obj.src = "../img/" + imageSrc;

    if (index === this.molangIndex || index === this.dechetIndex) {
      return this.createAndAppendImage(imageSrc);
    }
    index.appendChild(obj);
    return index;
  }

  selectTile(event) {
    if (this.gameOver) {
      return;
    }
    
    let clickedTile = event.target;
    while (clickedTile && clickedTile.tagName !== "DIV") {
      clickedTile = clickedTile.parentElement;
    }

    if (clickedTile === this.molangIndex) {
      console.log("clic sur molang" + clickedTile.id);
      this.score += this.point;
      document.getElementById("score").innerText = "score : " + this.score.toString();
      this.clearIndex(clickedTile.id);
    } else if (clickedTile === this.dechetIndex) {
      console.log("clic sur chenille");
      document.getElementById("score").innerText = "GAME OVER !!! score : " + this.score.toString();
      this.gameOver = true;
      clearInterval(this.molangInterval);
      clearInterval(this.dechetInterval);
      this.endGame();
    }
    console.log("rien");
    console.log(clickedTile);
    console.log(this.molangIndex);
  }

  endGame() {
    window.alert("GAME OVER ! Votre score est : " + this.score);
    window.location.href = "catalogue.html";
  }
}

function startGame(){
  var startButton = document.getElementById("startButton");
  startButton.style.display = "none";
  var game = new Game1();
  game.init();
}

