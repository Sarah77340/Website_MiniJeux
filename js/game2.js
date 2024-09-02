class Game2 {
  constructor() {
    this.path = "../img/";
    this.imgback = "../img/card0.png";
    this.score = 0;
    this.gameOver = false;
    this.nbRows = 4;
    this.nbColumns = 5;
    this.listCard = ["card1", "card2", "card3", "card4", "card5", 
                    "card6", "card7", "card8", "card9", "card10"];
    this.setCard = null;
    this.board = [];
    this.card1 = null;
    this.card2 = null;
  }

  init() {
    this.shuffleCard();
    this.playGame();
  }
  
  shuffleCard() {
    this.setCard = this.listCard.concat(this.listCard); // double chaque carte
    //console.log(this.setCard);
    for(let i = 0; i < this.setCard.length; i++) {
      const j = Math.floor(Math.random() * this.setCard.length);
      [this.setCard[i], this.setCard[j]] = [this.setCard[j], this.setCard[i]];
    }
    //console.log(this.setCard);
  }

  turnAllCards() {
    for(let i = 0; i < this.nbRows; i++) {
      for(let j = 0; j < this.nbColumns; j++) {
        let card = document.getElementById(i.toString() + "-" + j.toString());
        card.src = this.imgback;
      }
    }
  }

  clickCard(event) {
    console.log("clickCard: ");
    let clickedTile = event.target;
    if(clickedTile.src.includes("card0")){
      if(!this.card1){
        this.card1 = clickedTile;
        let [i,j] = this.card1.id.split("-");
        console.log("clickCard" + i + "," + j);
        this.card1.src = this.path + this.board[i][j] + ".png";
      } else if(!this.card2 && this.card1 != clickedTile) {
        this.card2 = clickedTile;
        let [i,j] = this.card2.id.split("-");
        this.card2.src = this.path + this.board[i][j] + ".png";
        console.log(this.card2.src);
        setTimeout(() => this.updateGame() , 500);
      }
    }
  }

  updateGame() {
    if(this.card1.src == this.card2.src) {
      this.score += 2;
      document.getElementById("score").innerText = "cartes trouvées : " + this.score.toString();
      this.endGame();
    } else {
      console.log("not the same");
      this.card1.src = this.imgback;
      this.card2.src = this.imgback;
    }
    this.card1 = null;
    this.card2 = null;
  }

  playGame() {
    for(let i = 0; i < this.nbRows; i++) {
      let row = [];
      for(let j = 0; j < this.nbColumns; j++) {
        let card = document.createElement("img");
        let cardImg = this.setCard.pop();
        
        card.src = this.path + cardImg + ".png";
        card.id = i.toString() + "-" + j.toString();
        card.classList.add("card");
        card.alt = cardImg;
        card.addEventListener("click", (event) => this.clickCard(event));
        document.getElementById("playgroundGame2").appendChild(card);

        row.push(cardImg);
      }
      this.board.push(row);
    }
    console.log(this.board);
    this.turnAllCards();
  }

  endGame() {
    if(this.score == this.nbRows * this.nbColumns) {
      window.alert("CONGRATULATION ! Vous avez trouvés les " + this.score + "cartes");
      window.location.href = "catalogue.html";
    } 
  }
}

function startGame(){
  var startButton2 = document.getElementById("startButton2");
  startButton2.style.display = "none";
  var game2 = new Game2();
  game2.init();
}